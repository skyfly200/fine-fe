import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let renderer: any, scene: any, camera: any;

const drawFine = (container: React.RefObject<HTMLDivElement>) => {
  const wrapper = container.current;
  if (!wrapper) return;
  const { clientWidth: width, clientHeight: height } = wrapper;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setAnimationLoop(animation);
  renderer.outputEncoding = THREE.sRGBEncoding;
  wrapper.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(0, 5, -15);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa73afc);

  RectAreaLightUniformsLib.init();

  const rectLight1 = new THREE.RectAreaLight(0xff0000, 5, 4, 10);
  rectLight1.position.set(-5, 5, 5);
  scene.add(rectLight1);

  const rectLight2 = new THREE.RectAreaLight(0x00ff00, 5, 4, 10);
  rectLight2.position.set(0, 5, 5);
  scene.add(rectLight2);

  const rectLight3 = new THREE.RectAreaLight(0x0000ff, 5, 4, 10);
  rectLight3.position.set(5, 5, 5);
  scene.add(rectLight3);

  scene.add(new RectAreaLightHelper(rectLight1));
  scene.add(new RectAreaLightHelper(rectLight2));
  scene.add(new RectAreaLightHelper(rectLight3));

  const geoFloor = new THREE.BoxGeometry(2000, 0.1, 2000);
  const matStdFloor = new THREE.MeshStandardMaterial({
    color: 0x808080,
    roughness: 0.1,
    metalness: 0
  });
  const mshStdFloor = new THREE.Mesh(geoFloor, matStdFloor);
  scene.add(mshStdFloor);

  const geoKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 16);
  const matKnot = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0, metalness: 0 });
  const meshKnot = new THREE.Mesh(geoKnot, matKnot);
  meshKnot.name = 'meshKnot';
  meshKnot.position.set(0, 5, 0);
  scene.add(meshKnot);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(meshKnot.position);
  controls.update();

  //
  window.addEventListener('resize', () => onWindowResize(width, height));
};

function onWindowResize(width: number, height: number) {
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function animation(time: number) {
  const mesh = scene.getObjectByName('meshKnot');
  mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}

export default drawFine;
