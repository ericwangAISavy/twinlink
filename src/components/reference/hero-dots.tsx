"use client";

import { useEffect, useRef } from "react";

const SPACING = 10;
const FRAME_MS = 1000 / 30;

function hash(x: number, y: number, z: number) {
  const n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return n - Math.floor(n);
}

function noise(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const ease = (t: number) => t * t * (3 - 2 * t);
  const u = ease(x - xi), v = ease(y - yi), w = ease(z - zi);
  const mix = (a: number, b: number, t: number) => a + (b - a) * t;
  const layer = (k: number) => mix(
    mix(hash(xi, yi, k), hash(xi + 1, yi, k), u),
    mix(hash(xi, yi + 1, k), hash(xi + 1, yi + 1, k), u),
    v,
  );
  return mix(layer(zi), layer(zi + 1), w);
}

/**
 * Drifting purple dot field behind the hero. An original implementation of the
 * observed effect (10px grid, soft moving clouds, pointer highlight).
 */
export function HeroDots() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -1e4, y: -1e4 };
    let width = 0, height = 0, frame = 0, last = 0, visible = true;

    const draw = (time: number) => {
      const t = time / 9000;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#7114eb";
      for (let y = SPACING / 2; y < height; y += SPACING) {
        for (let x = SPACING / 2; x < width; x += SPACING) {
          const cloud = noise(x / 260 + t, y / 220, t);
          // Fade out towards the middle so the headline stays clear.
          const edge = Math.min(1, Math.abs(x / width - 0.5) * 2);
          const near = Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / 180);
          const alpha = Math.min(0.8, Math.max(0, cloud - 0.42) * 2.1 * edge * edge + near * 0.35);
          if (alpha < 0.03) continue;
          context.globalAlpha = alpha;
          context.fillRect(x - 1, y - 1, 2, 2);
        }
      }
      context.globalAlpha = 1;
    };

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(last);
    };

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      if (!visible || time - last < FRAME_MS) return;
      last = time;
      draw(time);
    };

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const sizes = new ResizeObserver(resize);
    sizes.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    visibility.observe(canvas);
    if (!reduced) {
      window.addEventListener("pointermove", move, { passive: true });
      frame = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(frame);
      sizes.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 block h-full w-full" />;
}
