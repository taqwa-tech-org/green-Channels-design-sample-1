"use client";

/**
 * A woven twill fabric with a topstitched seam, rendered in a single shader.
 * - Geometry: one subdivided plane, gently undulating; the cursor lifts the cloth.
 * - Fragment: procedural twill weave, per-pixel normal perturbation, thread stitches.
 * Cheap on purpose (no textures, no post-processing) so mobile stays fast.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertex = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;
uniform float uAspect;
uniform float uAmp;
uniform vec2 uPlane;
varying vec2 vUv;
varying vec3 vN;
varying vec3 vView;

float wave(vec2 q) {
  float t = uTime;
  float w = 0.0;
  w += sin(q.x * 1.5 + t * 0.42) * 0.55;
  w += sin(q.y * 1.9 - t * 0.36 + q.x * 0.6) * 0.42;
  w += sin((q.x + q.y) * 3.1 + t * 0.66) * 0.14;
  float d = length(q - uMouse);
  w += exp(-d * d * 1.5) * 0.85;
  return w;
}

void main() {
  vUv = uv;
  vec2 q = (uv - 0.5) * vec2(uAspect, 1.0) * 2.4;
  float e = 0.02;
  float h = wave(q);
  float hx = wave(q + vec2(e, 0.0));
  float hy = wave(q + vec2(0.0, e));
  vec3 pos = position;
  pos.z += h * uAmp;

  float wx = uPlane.x / (uAspect * 2.4);
  float wy = uPlane.y / 2.4;
  vec3 n = normalize(vec3(-(hx - h) * uAmp / (e * wx), -(hy - h) * uAmp / (e * wy), 1.0));
  vN = normalize(normalMatrix * n);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vView = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

const fragment = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;
uniform float uAspect;
uniform vec3 uBase;
uniform vec3 uHi;
uniform vec3 uThread;
uniform float uSeamX;
varying vec2 vUv;
varying vec3 vN;
varying vec3 vView;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

// Twill: diagonal ribs plus a little cross-thread and fibre noise
float twill(vec2 p) {
  float d = p.x + p.y;
  float rib = abs(fract(d * 0.5) - 0.5) * 2.0;
  float cross = abs(fract((p.x - p.y) * 0.5) - 0.5) * 2.0;
  return rib * 0.72 + cross * 0.14 + noise(p * 2.3) * 0.14;
}

void main() {
  vec2 uv = vUv;
  vec2 p = uv * vec2(uAspect, 1.0) * 210.0;

  float h0 = twill(p);
  float hx = twill(p + vec2(0.6, 0.0));
  float hy = twill(p + vec2(0.0, 0.6));

  vec3 n = normalize(vN);
  n = normalize(n + vec3((h0 - hx) * 0.42, (h0 - hy) * 0.42, 0.0));

  // seam (slightly slanted)
  float sx = uSeamX + (uv.y - 0.5) * -0.12;
  float s = (uv.x - sx) * uAspect;

  float groove = exp(-pow(s / 0.05, 2.0));
  n = normalize(n + vec3(-s * 6.0 * groove, 0.0, 0.0));

  // light follows the cursor
  vec3 V = normalize(vView);
  vec3 L = normalize(vec3(uMouse * 0.32 + vec2(-0.3, 0.5), 0.85));
  float diff = clamp(dot(n, L), 0.0, 1.0);
  float wrap = 0.5 + 0.5 * dot(n, L);
  vec3 H = normalize(L + V);
  float spec = pow(clamp(dot(n, H), 0.0, 1.0), 38.0);

  vec3 col = mix(uBase * 0.45, uBase * 1.05 + uHi * 0.42 * diff, wrap * 0.85);
  col += uHi * spec * 0.22;
  col *= 1.0 - groove * 0.38;

  // three rows of topstitching along the seam
  float row = 0.0;
  float dash = 0.0;
  for (int i = -1; i <= 1; i++) {
    float fi = float(i);
    float ds = abs(s - fi * 0.0135);
    float r = 1.0 - smoothstep(0.0007, 0.0017, ds);
    float t = fract(uv.y * 17.0 + fi * 0.33);
    float dm = smoothstep(0.0, 0.04, t) * (1.0 - smoothstep(0.7, 0.74, t));
    if (r * dm > row * dash) {
      row = r;
      dash = dm;
    }
  }
  vec3 tcol = uThread * (0.5 + 0.75 * diff) + vec3(spec * 0.25);
  col = mix(col, tcol, row * dash);

  // soft shadow under the stitching
  float shadow = 0.0;
  for (int i = -1; i <= 1; i++) {
    float fi = float(i);
    shadow = max(shadow, 1.0 - smoothstep(0.0, 0.01, abs(s - fi * 0.0135 - 0.003)));
  }
  col *= 1.0 - shadow * 0.12;

  // vignette keeps the headline legible
  float vg = smoothstep(1.2, 0.2, length((uv - 0.5) * vec2(uAspect, 1.0)));
  col *= 0.32 + 0.68 * vg;

  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;

function Fabric({ still, seamX }: { still: boolean; seamX: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const pointer = useRef(new THREE.Vector2(0.3, 0.1));
  const target = useMemo(() => new THREE.Vector2(0, 0), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: still ? 6.5 : 0 },
      uMouse: { value: new THREE.Vector2(0.6, 0.1) },
      uAspect: { value: viewport.width / viewport.height },
      uAmp: { value: viewport.height * 0.11 },
      uPlane: { value: new THREE.Vector2(viewport.width * 1.4, viewport.height * 1.4) },
      uBase: { value: new THREE.Color("#06231a") },
      uHi: { value: new THREE.Color("#2f7f5c") },
      uThread: { value: new THREE.Color("#e9d7a3") },
      uSeamX: { value: viewport.width / viewport.height < 0.9 ? 0.88 : seamX },
    }),
    [seamX, still, viewport.width, viewport.height],
  );

  useEffect(() => {
    if (still) return;
    const on = (e: PointerEvent) => {
      pointer.current.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, [still]);

  const w = viewport.width * 1.4;
  const h = viewport.height * 1.4;

  useFrame((state, delta) => {
    const m = mat.current;
    if (!m) return;
    const u = m.uniforms;
    u.uTime.value = still ? 6.5 : state.clock.elapsedTime;
    u.uAspect.value = w / h;
    u.uSeamX.value = w / h < 0.9 ? 0.88 : seamX; // keep the seam clear of the headline on phones
    u.uAmp.value = viewport.height * 0.11;
    u.uPlane.value.set(w, h);
    if (!still) {
      target.set(pointer.current.x * (w / h) * 1.2, pointer.current.y * 1.2);
      const k = 1 - Math.pow(0.0008, delta);
      u.uMouse.value.lerp(target, k);
      if (mesh.current) {
        mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, -0.2 + pointer.current.x * 0.07, k);
        mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -0.1 + pointer.current.y * 0.05, k);
      }
    }
  });

  return (
    <mesh ref={mesh} rotation={[-0.1, -0.2, 0]}>
      <planeGeometry args={[w, h, 150, 100]} />
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  );
}

export default function FabricCanvas({
  still = false,
  seamX = 0.75,
  className = "",
}: {
  still?: boolean;
  seamX?: number;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      className={`${className} transition-opacity duration-[1600ms] ease-out ${ready ? "opacity-100" : "opacity-0"}`}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 34 }}
        frameloop={still ? "demand" : visible ? "always" : "never"}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        onCreated={() => setReady(true)}
      >
        <Fabric still={still} seamX={seamX} />
      </Canvas>
    </div>
  );
}
