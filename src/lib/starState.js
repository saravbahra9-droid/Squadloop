// Shared state between the DOM (scroll choreography) and the WebGL scene.
// The page writes starTarget from scroll position; the scene eases toward it
// every frame, so the star always moves with weight rather than snapping.

export const starTarget = { x: 0.5, y: 0.02, scale: 0.7, split: 0, opacity: 0, glow: 0.35 };

const KEYS = ["x", "y", "scale", "split", "opacity", "glow"];
let anchors = [];
let gateOpen = false; // closed until the preloader lifts, so the star can make an entrance

export function setAnchors(list) {
  anchors = list.slice().sort((a, b) => a.pos - b.pos);
}

export function openGate() {
  gateOpen = true;
}

// smoothstep: even travel between waypoints, gentle start and stop
const ease = (t) => t * t * (3 - 2 * t);

function assign(v) {
  for (const k of KEYS) if (v[k] !== undefined) starTarget[k] = v[k];
}

function compute(scrollY) {
  if (!anchors.length) return;
  const first = anchors[0];
  const last = anchors[anchors.length - 1];
  if (scrollY <= first.pos) return assign(first.v);
  if (scrollY >= last.pos) return assign(last.v);
  for (let i = 0; i < anchors.length - 1; i++) {
    const a = anchors[i];
    const b = anchors[i + 1];
    if (scrollY >= a.pos && scrollY < b.pos) {
      const span = b.pos - a.pos;
      const t = span <= 0 ? 1 : ease((scrollY - a.pos) / span);
      for (const k of KEYS) {
        const av = a.v[k] ?? 0;
        const bv = b.v[k] ?? 0;
        starTarget[k] = av + (bv - av) * t;
      }
      return;
    }
  }
}

// Interpolate star values between the two anchors around the scroll position.
export function sample(scrollY) {
  compute(scrollY);
  if (!gateOpen) {
    starTarget.opacity = 0;
    starTarget.scale *= 0.72;
  }
}
