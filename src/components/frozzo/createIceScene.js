import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Small, procedural scene: no model, video, HDR download or particle simulation.
export function createIceScene(host, hero) {
  gsap.registerPlugin(ScrollTrigger);
  const compact = matchMedia('(max-width: 1000px)').matches;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !compact, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, compact ? 1 : 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-8, 8, 5, -5, .1, 50);
  camera.position.z = 14;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, .04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xd5ffff, 0x174736, 2.4));
  const key = new THREE.DirectionalLight(0xe8ffff, 4);
  key.position.set(-4, 6, 8);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x66dacd, 3);
  rim.position.set(5, -1, -3);
  scene.add(rim);

  let seed = 42;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const textureCanvas = document.createElement('canvas');
  textureCanvas.width = textureCanvas.height = 128;
  const ctx2d = textureCanvas.getContext('2d');
  ctx2d.fillStyle = '#777';
  ctx2d.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 850; i++) {
    const value = Math.floor(105 + random() * 70);
    ctx2d.fillStyle = `rgb(${value},${value},${value})`;
    ctx2d.fillRect(random() * 128, random() * 128, 1 + random() * 3, 1);
  }
  ctx2d.strokeStyle = '#d6e4e6';
  ctx2d.lineWidth = .7;
  for (let i = 0; i < 8; i++) {
    let x = random() * 128, y = random() * 128;
    ctx2d.beginPath(); ctx2d.moveTo(x, y);
    for (let j = 0; j < 5; j++) { x += (random() - .5) * 32; y += random() * 19; ctx2d.lineTo(x, y); }
    ctx2d.stroke();
  }
  const frostTexture = new THREE.CanvasTexture(textureCanvas);
  const ice = new THREE.MeshPhysicalMaterial({
    color: 0xc5eae6, metalness: .06, roughness: .16, transmission: compact ? 0 : .28,
    thickness: .8, ior: 1.31, transparent: true, opacity: .78,
    clearcoat: 1, clearcoatRoughness: .08, envMapIntensity: 1.15,
    bumpMap: frostTexture, bumpScale: .028,
  });
  if (compact) ice.opacity = .42;
  const shardMaterial = ice.clone();
  shardMaterial.color.setHex(0xa5d8d7);
  shardMaterial.transmission = 0;
  shardMaterial.opacity = .56;
  const cubeGeometry = new RoundedBoxGeometry(1, 1, 1, 2, .09);
  const shardGeometry = new THREE.IcosahedronGeometry(.7, 0);
  const edgeGeometry = new THREE.EdgesGeometry(cubeGeometry, 24);
  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xe0ffff, transparent: true, opacity: .24 });
  const pieces = [];
  const count = compact ? 13 : 24;
  for (let i = 0; i < count; i++) {
    const isShard = i % 3 === 0;
    const mesh = new THREE.Mesh(isShard ? shardGeometry : cubeGeometry, isShard ? shardMaterial : ice);
    if (!isShard) mesh.add(new THREE.LineSegments(edgeGeometry, edgeMaterial));
    const angle = (i / count) * Math.PI * 2 + (random() - .5) * .35;
    const piece = { mesh, angle, distance: .8 + random() * .55, size: (isShard ? .06 : .10) + random() * .10,
      depth: (random() - .5) * 3, phase: random() * Math.PI * 2,
      spin: new THREE.Vector3(random() - .5, random() - .5, random() - .5) };
    mesh.rotation.set(random() * 3, random() * 3, random() * 3);
    pieces.push(piece); scene.add(mesh);
  }

  const progress = { opening: 0, scroll: 0 };
  const pointer = { x: 0, y: 0 }, smoothPointer = { x: 0, y: 0 };
  let centerX = 0, centerY = 0, radius = 2;
  let frame = 0, previous = 0, time = 0, visible = true, paused = false, disposed = false;
  const resize = () => {
    const bounds = host.getBoundingClientRect();
    const emblem = hero.querySelector('.fz-ice-emblem').getBoundingClientRect();
    const aspect = bounds.width / bounds.height;
    camera.left = -5 * aspect; camera.right = 5 * aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(bounds.width, bounds.height, false);
    centerX = ((emblem.left + emblem.width / 2 - bounds.left) / bounds.width - .5) * 10 * aspect;
    centerY = (.5 - (emblem.top + emblem.height / 2 - bounds.top) / bounds.height) * 10;
    radius = emblem.width / bounds.height * 5;
    render();
  };
  const render = () => {
    const expansion = progress.opening * .75 + progress.scroll * .55;
    smoothPointer.x += (pointer.x - smoothPointer.x) * .04;
    smoothPointer.y += (pointer.y - smoothPointer.y) * .04;
    for (const p of pieces) {
      const drift = Math.sin(time * .35 + p.phase) * radius * .07;
      const ring = radius * p.distance * (.32 + expansion);
      p.mesh.position.set(centerX + Math.cos(p.angle) * ring + drift + smoothPointer.x * p.depth * .06,
        centerY + Math.sin(p.angle) * ring * .78 + Math.cos(time * .28 + p.phase) * radius * .05 + smoothPointer.y * p.depth * .04,
        p.depth + expansion * .35);
      const size = radius * p.size * 2;
      p.mesh.scale.set(size, size * (1 + .15 * Math.sin(p.phase)), size);
      p.mesh.rotation.set(p.phase + time * p.spin.x * .16 + expansion * p.spin.x,
        p.phase / 2 + time * p.spin.y * .2 + expansion, p.phase + time * p.spin.z * .13);
    }
    renderer.render(scene, camera);
  };
  const loop = now => {
    frame = 0;
    if (disposed || paused || !visible || document.hidden) return;
    if (now - previous >= (compact ? 1000 / 24 : 1000 / 30)) {
      time += Math.min((now - previous) / 1000, .05);
      previous = now;
      render();
    }
    frame = requestAnimationFrame(loop);
  };
  const wake = () => { if (!frame && !disposed && !paused && visible && !document.hidden) { previous = performance.now(); frame = requestAnimationFrame(loop); } };
  const animations = gsap.context(() => {
    gsap.to(progress, { opening: 1, duration: 1.65, ease: 'power3.out' });
    gsap.fromTo('.fz-ice-seal', { opacity: .9, scale: .85 }, { opacity: 0, scale: 1.65, duration: 1.5, ease: 'power2.out' });
    gsap.fromTo('.fz-ice-fractures', { opacity: .8, scale: .88 }, { opacity: 0, scale: 1.6, duration: 1.3, ease: 'power3.out' });
    gsap.fromTo('.fz-ice-emblem > img', { scale: .94 }, { scale: 1, duration: 1.6, ease: 'power2.out' });
    gsap.fromTo('.fz-ice-copy > *', { y: 12 }, { y: 0, duration: 1.3, stagger: .06, ease: 'power2.out' });
    gsap.to(progress, { scroll: 1, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom 20%', scrub: .7 } });
    gsap.to('.fz-ice-emblem', { y: -45, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .7 } });
    gsap.to('.fz-ice-mist i', { xPercent: 12, yPercent: -8, duration: 12, stagger: 2, ease: 'sine.inOut', repeat: -1, yoyo: true });
  }, hero);
  const tweens = animations.getTweens();
  const sync = () => {
    const stop = paused || !visible || document.hidden;
    tweens.forEach(tween => { if (!tween.scrollTrigger) tween.paused(stop); });
    animations.getTweens().forEach(tween => {
      const trigger = tween.scrollTrigger;
      if (!trigger) return;
      if (stop) { trigger.getTween()?.pause(); trigger.disable(false); }
      else trigger.enable(false);
    });
    if (stop) { cancelAnimationFrame(frame); frame = 0; } else wake();
  };
  const intersection = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { threshold: 0 });
  const sizeObserver = new ResizeObserver(resize);
  const onPointer = event => {
    if (event.pointerType !== 'mouse') return;
    const rect = hero.getBoundingClientRect();
    pointer.x = (event.clientX - rect.left) / rect.width - .5;
    pointer.y = .5 - (event.clientY - rect.top) / rect.height;
  };
  const onLeave = () => { pointer.x = 0; pointer.y = 0; };
  const onContextLost = event => { event.preventDefault(); paused = true; sync(); hero.dataset.iceState = 'fallback'; };
  sizeObserver.observe(host); intersection.observe(hero);
  hero.addEventListener('pointermove', onPointer, { passive: true });
  hero.addEventListener('pointerleave', onLeave);
  document.addEventListener('visibilitychange', sync);
  renderer.domElement.addEventListener('webglcontextlost', onContextLost);
  resize(); hero.dataset.iceState = 'ready'; wake();

  return {
    setPaused(value) { paused = value; sync(); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      animations.revert();
      intersection.disconnect(); sizeObserver.disconnect();
      hero.removeEventListener('pointermove', onPointer); hero.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', sync);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      cubeGeometry.dispose(); shardGeometry.dispose(); edgeGeometry.dispose();
      ice.dispose(); shardMaterial.dispose(); edgeMaterial.dispose(); frostTexture.dispose(); environment.dispose();
      renderer.dispose(); renderer.domElement.remove(); delete hero.dataset.iceState;
    },
  };
}
