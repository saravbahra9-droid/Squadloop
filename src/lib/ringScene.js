// The WebGL "loop": a brushed-gold ring floating in deep navy with drifting
// gold dust. Loaded lazily so Three.js never blocks first paint.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { ringTarget } from "./ringState.js";

function brushedTexture() {
  // Fine streaks that run around the ring's circumference, used as a
  // roughness map so highlights smear like real brushed metal.
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 128;
  const g = c.getContext("2d");
  g.fillStyle = "rgb(90,90,90)";
  g.fillRect(0, 0, c.width, c.height);
  for (let y = 0; y < c.height; y++) {
    const v = 70 + Math.random() * 60;
    g.fillStyle = `rgba(${v},${v},${v},0.9)`;
    g.fillRect(0, y, c.width, 1);
  }
  for (let i = 0; i < 900; i++) {
    const y = Math.random() * c.height;
    const v = 50 + Math.random() * 110;
    g.fillStyle = `rgba(${v},${v},${v},0.35)`;
    g.fillRect(Math.random() * c.width, y, 60 + Math.random() * 400, 1);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 1);
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

export function createRingScene(canvas, { mobile = false, reduced = false } = {}) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.035);
  scene.environment = envRT.texture;

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  const key = new THREE.DirectionalLight(0xfff1d0, 2.2);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x6f8fc7, 1.1);
  rim.position.set(-4, -2, -3);
  scene.add(rim);

  const brushed = brushedTexture();
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#C8A84B"),
    metalness: 1,
    roughness: 0.32,
    roughnessMap: brushed,
    clearcoat: 0.35,
    clearcoatRoughness: 0.22,
    envMapIntensity: 1.25,
  });

  const geometry = new THREE.TorusGeometry(1, 0.082, mobile ? 64 : 96, mobile ? 220 : 360);
  const group = new THREE.Group();
  scene.add(group);
  const rings = [0, 1, 2].map((i) => {
    const m = new THREE.Mesh(geometry, material);
    m.rotation.order = "YXZ";
    group.add(m);
    if (i !== 1) m.visible = false;
    return m;
  });

  const glowTex = dotTexture("rgba(237,217,138,0.55)", "rgba(200,168,75,0.12)");
  const glow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.3,
    })
  );
  glow.scale.set(5.2, 5.2, 1);
  glow.position.z = -0.6;
  group.add(glow);

  // Drifting gold dust
  const count = mobile ? 160 : 520;
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
  const pMat = new THREE.PointsMaterial({
    size: mobile ? 0.05 : 0.04,
    map: dotTexture("rgba(255,240,200,1)", "rgba(200,168,75,0.6)"),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: new THREE.Color("#E8D69B"),
    opacity: 0.75,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  const cur = { ...ringTarget };
  let halfW = 1;
  let halfH = 1;
  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    halfW = halfH * camera.aspect;
  };
  resize();
  window.addEventListener("resize", resize);

  let tx = 0, ty = 0, px = 0, py = 0;
  const onPointer = (e) => {
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

    const f = reduced ? 1 : 1 - Math.pow(1 - 0.075, dt * 60);
    const fp = 1 - Math.pow(1 - 0.04, dt * 60);
    for (const k in cur) cur[k] += (ringTarget[k] - cur[k]) * f;
    px += (tx - px) * fp;
    py += (ty - py) * fp;

    group.position.set(cur.x * halfW, cur.y * halfH, 0);
    group.scale.setScalar(cur.scale);
    group.rotation.y = px * 0.38;
    group.rotation.x = py * 0.28;

    const split = cur.split;
    const offset = (split * halfW * 0.6) / Math.max(cur.scale, 0.001);
    const each = 1 - 0.35 * split;
    rings.forEach((m, i) => {
      if (i !== 1) m.visible = split > 0.003;
      m.position.x = (i - 1) * offset;
      m.scale.setScalar(each);
      m.rotation.y = Math.sin(time * 0.35 + i * 1.7 * split) * 0.75;
      m.rotation.x = 0.42 + Math.sin(time * 0.27 + i) * 0.08;
      m.rotation.z = time * 0.12 + i * split;
    });

    glow.material.opacity = 0.12 + cur.glow * 0.55;
    const gs = 4.6 + cur.glow * 1.6 + Math.sin(time * 1.2) * 0.08;
    glow.scale.set(gs, gs, 1);

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

    canvas.style.opacity = cur.opacity.toFixed(3);
    renderer.render(scene, camera);
  };
  frame();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointer);
    geometry.dispose();
    material.dispose();
    brushed.dispose();
    glowTex.dispose();
    pGeo.dispose();
    pMat.dispose();
    envRT.dispose();
    pmrem.dispose();
    renderer.dispose();
  };
}
