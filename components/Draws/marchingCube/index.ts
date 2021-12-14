import * as THREE from 'three'
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js'

let camera: any, scene: any, renderer: any

let light: any, pointLight, ambientLight: any

let effect: any, resolution: any

let effectController = {
  material: 'shiny',

  speed: 0.35,
  numBlobs: 12,
  resolution: 46,
  isolation: 111,

  floor: false,
  wallx: false,
  wallz: false,

  dummy: function () {}
}

let time = 0

const clock = new THREE.Clock()

const marchingCube = (container: React.RefObject<HTMLDivElement>) => {
  const wrapper = container.current
  if (!wrapper) return

  // CAMERA

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
  camera.position.set(-0, 0, 1500)

  // SCENE

  scene = new THREE.Scene()

  // LIGHTS

  light = new THREE.DirectionalLight(0xffffff)
  light.position.set(0.5, 0.5, 1)
  scene.add(light)

  pointLight = new THREE.PointLight(0xff3300)
  pointLight.position.set(0, 0, 100)
  scene.add(pointLight)

  ambientLight = new THREE.AmbientLight(0x080808)
  scene.add(ambientLight)

  // MATERIALS

  const material = new THREE.MeshPhongMaterial({ shininess: 2, vertexColors: true })

  // MARCHING CUBES

  resolution = 28

  effect = new MarchingCubes(resolution, material, true, true, 100000)
  effect.position.set(0, 0, 0)
  effect.scale.set(1000, 1000, 1000)

  effect.enableUvs = false
  effect.enableColors = true

  scene.add(effect)

  // RENDERER

  renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0xffffff, 0)
  wrapper.appendChild(renderer.domElement)
  // EVENTS

  window.addEventListener('resize', onWindowResize)
  animate()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

// this controls content of marching cubes voxel field

function updateCubes(object: any, time: number, numblobs: number) {
  object.reset()

  // fill the field with some metaballs

  const rainbow = [
    new THREE.Color(0xff0000),
    new THREE.Color(0xff7f00),
    new THREE.Color(0xffff00),
    new THREE.Color(0x00ff00),
    new THREE.Color(0x0000ff),
    new THREE.Color(0x4b0082),
    new THREE.Color(0x9400d3)
  ]
  const subtract = 12
  const strength = 1.2 / ((Math.sqrt(numblobs) - 1) / 4 + 1)

  for (let i = 0; i < numblobs; i++) {
    const ballx = Math.sin(i + 1.26 * time * (1.03 + 0.5 * Math.cos(0.21 * i))) * 0.27 + 0.5
    const bally = Math.abs(Math.cos(i + 1.12 * time * Math.cos(1.22 + 0.1424 * i))) * 0.77 // dip into the floor
    const ballz = Math.cos(i + 1.32 * time * 0.1 * Math.sin(0.92 + 0.53 * i)) * 0.27 + 0.5

    object.addBall(ballx, bally, ballz, strength, subtract, rainbow[i % 7])
  }
}

//

function animate() {
  requestAnimationFrame(animate)
  render()
}

function render() {
  const delta = clock.getDelta()

  time += delta * effectController.speed * 0.5

  // marching cubes

  if (effectController.resolution !== resolution) {
    resolution = effectController.resolution
    effect.init(Math.floor(resolution))
  }

  if (effectController.isolation !== effect.isolation) {
    effect.isolation = effectController.isolation
  }

  updateCubes(effect, time, effectController.numBlobs)

  // render

  renderer.render(scene, camera)
}

export default marchingCube
