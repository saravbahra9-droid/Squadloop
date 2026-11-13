// The SquadLoop star, measured from the logo artwork: four tips at radius 1,
// inner corners at 0.256 on the diagonal, sides bowed slightly inward, and a
// cut-out that is the same star at 41%. One definition feeds both the 3D
// model and the flat SVG fallback, so they always match.

export const WAIST = 0.256;
export const HOLE = 0.41;
const BOW = 0.03;

// Eight quadratic segments starting from the top tip (0, s), going clockwise.
export function starSegments(s = 1) {
  const R = s;
  const w = WAIST * s;
  const b = BOW * s;
  const len = Math.hypot(w, R - w);
  const quadrant = [
    { c: [w / 2 - ((R - w) / len) * b, (R + w) / 2 - (w / len) * b], p: [w, w] },
    { c: [(R + w) / 2 - (w / len) * b, w / 2 - ((R - w) / len) * b], p: [R, 0] },
  ];
  const rot = ([x, y], q) => {
    for (let i = 0; i < q; i++) [x, y] = [y, -x]; // quarter turn clockwise
    return [x, y];
  };
  const out = [];
  for (let q = 0; q < 4; q++) for (const seg of quadrant) out.push({ c: rot(seg.c, q), p: rot(seg.p, q) });
  return out;
}

// SVG path (outer star + cut-out) inside a size x size box. Use fill-rule evenodd.
export function starSvgPath(size = 100) {
  const h = size / 2;
  const n = (v) => +v.toFixed(2);
  const one = (s) =>
    `M${n(h)} ${n(h - s)} ` +
    starSegments(s)
      .map(({ c, p }) => `Q${n(h + c[0])} ${n(h - c[1])} ${n(h + p[0])} ${n(h - p[1])}`)
      .join(" ") +
    " Z";
  return `${one(h)} ${one(h * HOLE)}`;
}

/* ------------------------------------------------------------------------ */
/* Offset outlines for the 3D model.                                         */
/*                                                                           */
/* A chamfered edge needs the star outline moved inward (or, for the         */
/* cut-out, outward) by a fixed distance. Near the needle-sharp tips a naive */
/* offset folds over itself, which is what makes generic extrusions look     */
/* crumpled there. The star is symmetric, so instead we offset one side      */
/* (top tip to inner corner), trim or extend it to meet its mirror images    */
/* exactly on the arm's axis and on the diagonal, and build the rest of the  */
/* outline from that one clean piece.                                        */
/* ------------------------------------------------------------------------ */

function baseSide(s, offset, samples = 40) {
  const T = [0, s];
  const { c: C, p: W } = starSegments(s)[0];
  let pts = [];
  let first = null;
  let last = null;
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const u = 1 - t;
    const x = u * u * T[0] + 2 * u * t * C[0] + t * t * W[0];
    const y = u * u * T[1] + 2 * u * t * C[1] + t * t * W[1];
    let dx = 2 * u * (C[0] - T[0]) + 2 * t * (W[0] - C[0]);
    let dy = 2 * u * (C[1] - T[1]) + 2 * t * (W[1] - C[1]);
    const l = Math.hypot(dx, dy);
    dx /= l;
    dy /= l;
    // travelling clockwise, the inside of the star is on the right-hand side
    pts.push([x + dy * offset, y - dx * offset]);
    if (i === 0) first = [dx, dy];
    last = [dx, dy];
  }

  // start boundary: the arm's axis (x = 0)
  if (pts[0][0] > 1e-9) {
    const u = pts[0][0] / first[0];
    pts.unshift([0, pts[0][1] - u * first[1]]);
  } else if (pts[0][0] < -1e-9) {
    let j = pts.findIndex((p) => p[0] >= 0);
    if (j < 1) j = 1;
    const a = pts[j - 1];
    const b = pts[j];
    const k = -a[0] / (b[0] - a[0]);
    pts = [[0, a[1] + (b[1] - a[1]) * k], ...pts.slice(j)];
  }

  // end boundary: the diagonal (y = x)
  const f = (p) => p[1] - p[0];
  const end = pts[pts.length - 1];
  if (f(end) > 1e-9) {
    const u = f(end) / (last[0] - last[1]);
    const x = end[0] + u * last[0];
    pts.push([x, x]);
  } else if (f(end) < -1e-9) {
    let j = pts.length - 1;
    while (j > 0 && f(pts[j]) < 0) j--;
    const a = pts[j];
    const b = pts[j + 1];
    const k = f(a) / (f(a) - f(b));
    const x = a[0] + (b[0] - a[0]) * k;
    pts = [...pts.slice(0, j + 1), [x, x]];
  }
  return pts;
}

// Evenly re-space a polyline to n + 1 points, so offset copies of the same
// side line up point for point.
function resample(pts, n) {
  const acc = [0];
  for (let i = 1; i < pts.length; i++) acc.push(acc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = acc[acc.length - 1];
  const out = [];
  let j = 1;
  for (let i = 0; i <= n; i++) {
    const d = (total * i) / n;
    while (j < pts.length - 1 && acc[j] < d) j++;
    const span = acc[j] - acc[j - 1] || 1;
    const k = Math.min(1, Math.max(0, (d - acc[j - 1]) / span));
    out.push([pts[j - 1][0] + (pts[j][0] - pts[j - 1][0]) * k, pts[j - 1][1] + (pts[j][1] - pts[j - 1][1]) * k]);
  }
  return out;
}

// The eight sides of a star outline at a given size and inward offset, each a
// polyline of n + 1 points, clockwise from the top tip. Each side starts where
// the previous one ends.
export function starSides(s = 1, offset = 0, n = 32) {
  const base = resample(baseSide(s, offset), n);
  const mirror = base.map(([x, y]) => [y, x]).reverse();
  const sides = [];
  for (let q = 0; q < 4; q++) {
    for (const side of [base, mirror]) {
      sides.push(
        side.map(([x, y]) => {
          for (let i = 0; i < q; i++) [x, y] = [y, -x];
          return [x, y];
        })
      );
    }
  }
  return sides;
}
