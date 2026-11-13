// Shared state between the DOM (scroll choreography) and the WebGL scene.
// The page writes ringTarget from scroll position; the scene eases toward it
// every frame, so the ring always moves with weight rather than snapping.

export const ringTarget = { x: 0.5, y: 0.02, scale: 0.9, split: 0, opacity: 1, glow: 0.35 };

const KEYS = ["x", "y", "scale", "split", "opacity", "glow"];
let anchors = [];

export function setAnchors(list) {
  anchors = list.slice().sort((a, b) => a.pos - b.pos);
}

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function assign(v) {
  for (const k of KEYS) if (v[k] !== undefined) ringTarget[k] = v[k];
}

// Interpolate ring values between the two anchors around the scroll position.
export function sample(scrollY) {
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
        ringTarget[k] = av + (bv - av) * t;
      }
      return;
    }
  }
}
