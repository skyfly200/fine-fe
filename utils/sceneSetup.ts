import * as THREE from "three";

const sceneSetup = (container: React.RefObject<HTMLDivElement>) => {
  const wrapper = container.current;
  if (!wrapper) return;
  const { clientWidth: width, clientHeight: height } = wrapper;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  wrapper.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x345ee0 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  scene.background = new THREE.Color(0xa73afc);
  camera.position.z = 5;

  const animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();
};

export default sceneSetup;
