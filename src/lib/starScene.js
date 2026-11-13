// The WebGL star: the SquadLoop four-point star, cut hollow like the logo mark,
// in brushed gold, floating in deep navy with drifting gold dust.
// Loaded lazily so Three.js never blocks first paint.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { starTarget } from "./starState.js";
import { starSides, HOLE } from "./starShape.js";

// Build the star as a cast gold pendant: flat brushed faces front and back,
// a polished chamfer around every edge, and straight polished walls.
// Group 0 = brushed faces, group 1 = polished edges.
function starGeometry() {
  const HALF = 0.085; // half the total thickness
  const BEVEL = 0.032;
  const N = 32;
  const pos = [];
  const nor = [];
  const uv = [];
  const faceIdx = [];
  const edgeIdx = [];

  const outer0 = starSides(1, 0, N); // silhouette
  const outer1 = starSides(1, BEVEL, N); // edge of the flat face
  const hole0 = starSides(HOLE, 0, N); // cut-out
  const hole1 = starSides(HOLE, -BEVEL, N); // edge of the flat face around the cut-out

  const loop = (sides) => sides.flatMap((side) => side.slice(0, -1));

  // --- flat faces, with normals eased outward a touch so reflections travel
  //     across the metal as the star turns (a real cast face is never dead flat)
  const contour = loop(outer1);
  const inner = loop(hole1);
  const flat = [...contour, ...inner];
  const tris = THREE.ShapeUtils.triangulateShape(
    contour.map(([x, y]) => new THREE.Vector2(x, y)),
    [inner.map(([x, y]) => new THREE.Vector2(x, y))]
  );
  const PILLOW = 0.16;
  for (const sign of [1, -1]) {
    const base = pos.length / 3;
    for (const [x, y] of flat) {
      pos.push(x, y, HALF * sign);
      const n = new THREE.Vector3(x * PILLOW, y * PILLOW, sign).normalize();
      nor.push(n.x, n.y, n.z);
      uv.push(x * 0.5 + 0.5, y * 0.5 + 0.5);
    }
    for (const [a, b, c] of tris) {
      const [ax, ay] = flat[a];
      const [bx, by] = flat[b];
      const [cx, cy] = flat[c];
      const ccw = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax) > 0;
      if (ccw === (sign > 0)) faceIdx.push(base + a, base + b, base + c);
      else faceIdx.push(base + a, base + c, base + b);
    }
  }

  // --- edge strips between two matching polylines at two depths
  const va = new THREE.Vector3();
  const vb = new THREE.Vector3();
  const vn = new THREE.Vector3();
  const strip = (A, zA, B, zB, hint) => {
    const base = pos.length / 3;
    const m = A.length;
    for (let i = 0; i < m; i++) {
      const p = A[Math.max(0, i - 1)];
      const q = A[Math.min(m - 1, i + 1)];
      const p2 = B[Math.max(0, i - 1)];
      const q2 = B[Math.min(m - 1, i + 1)];
      // direction along the edge (averaged over both rails) x direction across it
      va.set(q[0] - p[0] + q2[0] - p2[0], q[1] - p[1] + q2[1] - p2[1], 0);
      vb.set(B[i][0] - A[i][0], B[i][1] - A[i][1], zB - zA);
      vn.crossVectors(va, vb).normalize();
      // face away from the metal: the hint is the side of travel that is empty
      const hx = hint * va.y;
      const hy = -hint * va.x;
      const hz = zA + zB;
      if (vn.x * hx + vn.y * hy + vn.z * hz * 4 < 0) vn.negate();
      for (const [pt, z] of [[A[i], zA], [B[i], zB]]) {
        pos.push(pt[0], pt[1], z);
        nor.push(vn.x, vn.y, vn.z);
        uv.push(0, 0);
      }
    }
    for (let i = 0; i < m - 1; i++) {
      const a = base + i * 2;
      const quad = [
        [a, a + 1, a + 2],
        [a + 2, a + 1, a + 3],
      ];
      for (const t of quad) {
        // wind each triangle to agree with its normal
        const [i0, i1, i2] = t;
        va.set(pos[i1 * 3] - pos[i0 * 3], pos[i1 * 3 + 1] - pos[i0 * 3 + 1], pos[i1 * 3 + 2] - pos[i0 * 3 + 2]);
        vb.set(pos[i2 * 3] - pos[i0 * 3], pos[i2 * 3 + 1] - pos[i0 * 3 + 1], pos[i2 * 3 + 2] - pos[i0 * 3 + 2]);
        vn.crossVectors(va, vb);
        const d = vn.x * nor[i0 * 3] + vn.y * nor[i0 * 3 + 1] + vn.z * nor[i0 * 3 + 2];
        if (d >= 0) edgeIdx.push(i0, i1, i2);
        else edgeIdx.push(i0, i2, i1);
      }
    }
  };

  const WALL = HALF - BEVEL;
  for (let k = 0; k < 8; k++) {
    // outside edge: empty space is on the left of clockwise travel
    strip(outer1[k], HALF, outer0[k], WALL, -1);
    strip(outer0[k], WALL, outer0[k], -WALL, -1);
    strip(outer0[k], -WALL, outer1[k], -HALF, -1);
    // cut-out edge: empty space is on the right
    strip(hole1[k], HALF, hole0[k], WALL, 1);
    strip(hole0[k], WALL, hole0[k], -WALL, 1);
    strip(hole0[k], -WALL, hole1[k], -HALF, 1);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex([...faceIdx, ...edgeIdx]);
  geo.addGroup(0, faceIdx.length, 0);
  geo.addGroup(faceIdx.length, edgeIdx.length, 1);
  geo.computeBoundingSphere();
  return geo;
}

function brushedTexture() {
  // Fine horizontal streaks used as a roughness map, so highlights smear
  // across the faces like real brushed metal.
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const g = c.getContext("2d");
  g.fillStyle = "rgb(96,96,96)";
  g.fillRect(0, 0, c.width, c.height);
  for (let y = 0; y < c.height; y++) {
    const v = 78 + Math.random() * 52;
    g.fillStyle = `rgba(${v},${v},${v},0.85)`;
    g.fillRect(0, y, c.width, 1);
  }
  for (let i = 0; i < 1400; i++) {
    const y = Math.random() * c.height;
    const v = 56 + Math.random() * 100;
    g.fillStyle = `rgba(${v},${v},${v},0.3)`;
    g.fillRect(Math.random() * c.width, y, 40 + Math.random() * 260, 1);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1.5, 1.5);
  return t;
}

function dotTexture(inner, outer) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, inner);
  grd.addColorStop(0.35, outer);
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

export function createStarScene(canvas, { mobile = false, reduced = false } = {}) {
  const stage = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.16;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.035);
  scene.environment = envRT.texture;

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  const key = new THREE.DirectionalLight(0xfff1d0, 2.4);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x6f8fc7, 1.2);
  rim.position.set(-4, -2, -3);
  scene.add(rim);

  const brushed = brushedTexture();
  brushed.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const faceMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#C8A84B"),
    metalness: 1,
    roughness: 0.46,
    roughnessMap: brushed,
    clearcoat: 0.2,
    clearcoatRoughness: 0.35,
    envMapIntensity: 1.12,
    transparent: true,
  });
  const edgeMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#D6B85E"),
    metalness: 1,
    roughness: 0.16,
    envMapIntensity: 1.5,
    transparent: true,
  });
  const materials = [faceMat, edgeMat];

  const geometry = starGeometry();
  const group = new THREE.Group();
  scene.add(group);
  const stars = [0, 1, 2].map((i) => {
    const m = new THREE.Mesh(geometry, materials);
    m.rotation.order = "YXZ";
    group.add(m);
    if (i !== 1) m.visible = false;
    return m;
  });

  const glowTex = dotTexture("rgba(237,217,138,0.55)", "rgba(200,168,75,0.12)");
  const glowMat = new THREE.SpriteMaterial({
    map: glowTex,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    opacity: 0,
  });
  const glow = new THREE.Sprite(glowMat);
  glow.scale.set(5, 5, 1);
  glow.position.z = -0.6;
  group.add(glow);

  // Drifting gold dust
  const count = mobile ? 150 : 420;
  const pos = new Float32Array(count * 3);
  const speed = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 14;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
    pos[i * 3 + 2] = -3 + Math.random() * 4;
    speed[i] = 0.04 + Math.random() * 0.12;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const dustTex = dotTexture("rgba(255,240,200,1)", "rgba(200,168,75,0.6)");
  const pMat = new THREE.PointsMaterial({
    size: mobile ? 0.05 : 0.04,
    map: dustTex,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: new THREE.Color("#E8D69B"),
    opacity: 0,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  const cur = { ...starTarget };
  let halfW = 1;
  let halfH = 1;
  let lastW = 0;
  let lastH = 0;
  // The stage is sized in CSS (to the largest viewport on phones), so the
  // drawing buffer is only rebuilt on a real resize or rotation, never when
  // a mobile browser's toolbar slides in and out mid-scroll.
  const resize = () => {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (!w || !h || (w === lastW && h === lastH)) return;
    lastW = w;
    lastH = h;
    // cap the pixel budget so large retina screens keep a high frame rate
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(4.2e6 / (w * h))));
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    halfW = halfH * camera.aspect;
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(stage);

  let tx = 0, ty = 0, px = 0, py = 0;
  const onPointer = (e) => {
    if (e.pointerType === "touch") return;
    tx = (e.clientX / window.innerWidth - 0.5) * 2;
    ty = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  let last = performance.now();
  let raf = 0;
  let time = 0;

  const frame = () => {
    raf = requestAnimationFrame(frame);
    if (document.hidden) return;
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!reduced) time += dt;

    // frame-rate independent damping: same glide at 60Hz and 120Hz
    const f = reduced ? 1 : 1 - Math.exp(-dt * 4.6);
    const fp = 1 - Math.exp(-dt * 2.6);
    for (const k in cur) cur[k] += (starTarget[k] - cur[k]) * f;
    px += (tx - px) * fp;
    py += (ty - py) * fp;

    group.position.set(cur.x * halfW, cur.y * halfH, 0);
    group.scale.setScalar(cur.scale);
    group.rotation.y = px * 0.34;
    group.rotation.x = py * 0.24;

    const split = cur.split;
    const offset = (split * halfW * 0.6) / Math.max(cur.scale, 0.001);
    const each = 1 - 0.35 * split;
    stars.forEach((m, i) => {
      if (i !== 1) m.visible = split > 0.003;
      m.position.x = (i - 1) * offset;
      m.scale.setScalar(each);
      // a slow, weighted sway that lets the gold catch the light
      m.rotation.y = Math.sin(time * 0.42 + i * 1.7 * split) * 0.42;
      m.rotation.x = Math.sin(time * 0.31 + i) * 0.1;
      m.rotation.z = Math.sin(time * 0.23 + i * 2 * split) * 0.045;
    });

    const alpha = Math.min(1, Math.max(0, cur.opacity));
    faceMat.opacity = alpha;
    edgeMat.opacity = alpha;
    glowMat.opacity = (0.1 + cur.glow * 0.5) * alpha;
    const gs = 4.4 + cur.glow * 1.6 + Math.sin(time * 1.2) * 0.08;
    glow.scale.set(gs, gs, 1);
    // the dust stays through the whole page, a little quieter behind content
    pMat.opacity = Math.min(0.75, 0.3 + alpha * 0.45) * Math.min(1, time * 0.6 + (reduced ? 1 : 0));

    if (!reduced) {
      const arr = pGeo.attributes.position.array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += speed[i] * dt;
        arr[i * 3] += Math.sin(time * 0.3 + i) * 0.0008;
        if (arr[i * 3 + 1] > 4) arr[i * 3 + 1] = -4;
      }
      pGeo.attributes.position.needsUpdate = true;
    }
    points.position.x = -px * 0.15;
    points.position.y = py * 0.1;

    renderer.render(scene, camera);
  };
  frame();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    window.removeEventListener("pointermove", onPointer);
    geometry.dispose();
    faceMat.dispose();
    edgeMat.dispose();
    brushed.dispose();
    glowTex.dispose();
    dustTex.dispose();
    glowMat.dispose();
    pGeo.dispose();
    pMat.dispose();
    envRT.dispose();
    pmrem.dispose();
    renderer.dispose();
  };
}
