'use client';

import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  NormalBlending,
  OrthographicCamera,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from 'three';
import { EdgesGeometry, WireframeGeometry } from 'three';

import type { WebGLRendererParameters } from 'three';

/**
 * The hero's third dimension.
 *
 * A slow parallax field of points — the "data in motion" reading of the page's
 * grid motif — with one wireframe solid drifting beside it. Both are drawn in
 * the page's own palette by sampling the CSS custom properties at mount and on
 * theme change, so the scene belongs to whichever theme is active rather than
 * importing its own colours.
 *
 * Motion design: everything animates continuously but never bounces; under
 * `prefers-reduced-motion` the exact same scene renders once as a still frame.
 * The render loop pauses whenever the hero is not visible, so scrolling away
 * costs nothing.
 */

export interface HeroSceneHandle {
  /** Release the WebGL context and stop the loop. */
  dispose(): void;
}

interface HeroSceneOptions {
  readonly container: HTMLElement;
  readonly onFirstFrame?: () => void;
}

const PALETTE = {
  ink: '--color-ink',
  paper: '--color-slate-50',
  indigo: '--color-indigo-accent',
  violet: '--color-violet-accent',
} as const;

function readToken(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value.length > 0 ? value : fallback;
}

/** Dark glows over ink; over paper the same pigments read washed out, so they
    are darkened and composited normally instead. Returns the blending mode. */
function themeBlending(dark: boolean): typeof AdditiveBlending | typeof NormalBlending {
  return dark ? AdditiveBlending : NormalBlending;
}

/** The near field keeps its hue in both themes; light mode just darkens it. */
function fieldColor(base: Color, dark: boolean): Color {
  return dark ? base : base.clone().multiplyScalar(0.78);
}

/** Light mode leans on opacity rather than additive glow for the solid. */
function solidOpacity(dark: boolean): number {
  return dark ? 0.34 : 0.45;
}

function innerOpacity(dark: boolean): number {
  return dark ? 0.18 : 0.26;
}

const FIELD_SPAN = 24;

/** Deterministic pseudo-random in [-1, 1] — stable layout across reloads. */
function seeded(offset: number): number {
  const x = Math.sin(offset * 127.1) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

export function createHeroScene({ container, onFirstFrame }: HeroSceneOptions): HeroSceneHandle {
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  } satisfies WebGLRendererParameters);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight, false);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new OrthographicCamera(-12, 12, 7, -7, 0.1, 100);
  camera.position.set(0, 0, 10);

  /* ── Parallax point field ────────────────────────────────────────────────
     Three depth bands drift at different rates. Depth comes from parallax and
     opacity alone; colour stays inside the page's indigo → violet identity,
     one hue per band, with the far band faded toward the background so no
     third accent sneaks in. */
  const bands = [
    { count: 380, z: -2, size: 0.05, opacity: 0.55, speed: 1, token: PALETTE.indigo },
    { count: 320, z: -6, size: 0.045, opacity: 0.35, speed: 0.55, token: PALETTE.violet },
    { count: 200, z: -11, size: 0.04, opacity: 0.2, speed: 0.3, token: PALETTE.indigo },
  ] as const;

  const fields: Array<{ points: Points; token: string; speed: number }> = [];
  const fieldGroup = new Scene();
  for (const band of bands) {
    const positions = new Float32Array(band.count * 3);
    for (let index = 0; index < band.count; index += 1) {
      positions[index * 3] = seeded(index * 3 + band.z * 10) * (FIELD_SPAN / 2);
      positions[index * 3 + 1] = seeded(index * 7 + band.z * 10) * 6;
      positions[index * 3 + 2] = band.z + seeded(index * 11) * 1.5;
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    const material = new PointsMaterial({
      color: new Color(readToken(band.token, '#6366f1')),
      size: band.size,
      transparent: true,
      opacity: band.opacity,
      depthWrite: false,
      blending: AdditiveBlending,
      sizeAttenuation: false,
    });
    const points = new Points(geometry, material);
    points.position.z = band.z;
    fieldGroup.add(points);
    fields.push({ points, token: band.token, speed: band.speed });
  }
  scene.add(fieldGroup);

  /* ── Wireframe solid ─────────────────────────────────────────────────────
     One icosahedron, its edges drawn as line segments — the systems-diagram
     reading of a 3D object. It drifts, it does not spin. */
  const solidColor = new Color(readToken(PALETTE.violet, '#8b5cf6'));
  const solidGeometry = new IcosahedronGeometry(2.6, 1);
  const solidEdges = new EdgesGeometry(solidGeometry);
  const solid = new LineSegments(
    solidEdges,
    new LineBasicMaterial({ color: solidColor, transparent: true, opacity: 0.32 }),
  );
  solid.position.set(4.5, 0.4, -4);
  scene.add(solid);

  /* A fainter inner shell gives the solid depth — same violet family, one step
     darker, so the object reads as one colour decision rather than a rainbow. */
  const innerGeometry = new WireframeGeometry(new SphereGeometry(1.7, 12, 8));
  const inner = new LineSegments(
    innerGeometry,
    new LineBasicMaterial({ color: solidColor.clone(), transparent: true, opacity: 0.18 }),
  );
  inner.position.copy(solid.position);
  scene.add(inner);

  /* ── Theme awareness ─────────────────────────────────────────────────────
     The scene samples CSS tokens, so it follows `<html class="dark">` — the
     same single source of truth the stylesheet uses. Dark mode glows (additive
     blending over ink); light mode cannot glow over paper, so it switches to
     plain compositing and darkens the pigments instead. */
  const root = document.documentElement;
  const applyTheme = () => {
    const dark = root.classList.contains('dark');
    const indigo = new Color(readToken(PALETTE.indigo, '#6366f1'));
    const violet = new Color(readToken(PALETTE.violet, '#8b5cf6'));
    /* Fades the far band toward whichever surface sits behind it. */
    const surface = new Color(
      readToken(dark ? PALETTE.ink : PALETTE.paper, dark ? '#000000' : '#faf9f7'),
    );

    for (const { points, token } of fields) {
      const material = points.material as PointsMaterial;
      const base = token === PALETTE.violet ? violet : indigo;
      material.color.copy(fieldColor(base, dark));
      material.blending = themeBlending(dark);
      material.needsUpdate = true;
    }
    /* The dimmest band is also the furthest: mixed 55% into the surface so it
       reads as atmosphere rather than as a colour. */
    (fields[2].points.material as PointsMaterial).color.lerp(surface, 0.55);

    const solidMaterial = solid.material as LineBasicMaterial;
    solidMaterial.color.copy(dark ? violet : violet.clone().multiplyScalar(0.85));
    solidMaterial.opacity = solidOpacity(dark);

    const innerMaterial = inner.material as LineBasicMaterial;
    innerMaterial.color.copy(violet.clone().multiplyScalar(dark ? 0.8 : 0.7));
    innerMaterial.opacity = innerOpacity(dark);
  };
  applyTheme();

  const themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(root, { attributes: true, attributeFilter: ['class'] });

  /* ── Motion ────────────────────────────────────────────────────────────── */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clock = { start: performance.now() };
  let rafId = 0;
  let running = false;
  let firstFrameFired = false;

  const firstFrame = () => {
    if (firstFrameFired) return;
    firstFrameFired = true;
    onFirstFrame?.();
  };

  const renderStill = () => {
    /* One settled frame: the t=0 pose, rendered once. */
    fieldGroup.position.y = 0;
    renderer.render(scene, camera);
    firstFrame();
  };

  const renderAnimated = (now: number) => {
    const elapsed = (now - clock.start) / 1000;
    for (const { points, speed } of fields) {
      points.position.x = Math.sin(elapsed * 0.05 * speed) * 0.9;
      points.position.y = ((elapsed * 0.12 * speed) % 2.4) - 1.2;
    }
    solid.rotation.y = elapsed * 0.06;
    solid.rotation.x = Math.sin(elapsed * 0.11) * 0.12;
    solid.position.y = 0.4 + Math.sin(elapsed * 0.23) * 0.35;
    inner.rotation.y = -elapsed * 0.09;
    inner.rotation.z = elapsed * 0.05;

    renderer.render(scene, camera);
    firstFrame();
  };

  const render = (now: number) => {
    if (reducedMotion.matches) {
      renderStill();
      return;
    }
    renderAnimated(now);
  };

  const loop = (now: number) => {
    render(now);
    if (running && !reducedMotion.matches) rafId = requestAnimationFrame(loop);
  };

  const start = () => {
    if (running) return;
    running = true;
    rafId = requestAnimationFrame(loop);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(rafId);
  };

  /* Only render while the hero can actually be seen. */
  const visibility = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) start();
      else stop();
    },
    { threshold: 0 },
  );
  visibility.observe(container);

  /* The renderer must track the panel it lives in. */
  const resize = () => {
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    camera.left = -12;
    camera.right = 12;
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  /* Draw the first frame immediately, animated or not. */
  render(performance.now());

  return {
    dispose() {
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      solidEdges.dispose();
      innerGeometry.dispose();
      solidGeometry.dispose();
      for (const { points } of fields) {
        points.geometry.dispose();
        (points.material as PointsMaterial).dispose();
      }
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
