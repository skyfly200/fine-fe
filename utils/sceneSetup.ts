import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const sceneSetup = (container: React.RefObject<HTMLDivElement>) => {
  const wrapper = container.current
  if (!wrapper) return
  const { clientWidth: width, clientHeight: height } = wrapper
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 2000)
  camera.position.y = 6
  camera.position.z = -6

  const renderer = new THREE.WebGLRenderer({ alpha: true })

  renderer.setSize(width, height)
  wrapper.appendChild(renderer.domElement)
  const material = new THREE.MeshLambertMaterial({ color: 0xf1f1f1 })
  const geometry = new THREE.SphereBufferGeometry(0.6, 16, 16)
  scene.background = null

  scene.add(new THREE.AmbientLight(0x666666))

  // composer

  var composer = new EffectComposer(renderer)
  var renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  //custom shader pass
  // @ts-ignore
  var vertShader = document.getElementById('vertexShader').textContent
  // @ts-ignore
  var fragShader = document.getElementById('fragmentShader').textContent
  var counter = 0.0
  var myEffect = {
    uniforms: {
      tDiffuse: { value: null },
      amount: { value: counter }
    },
    vertexShader: vertShader,
    fragmentShader: fragShader
  }

  var customPass = new ShaderPass(myEffect)
  customPass.renderToScreen = true
  composer.addPass(customPass)

  //RENDER LOOP
  const loader = new GLTFLoader().setPath('/')
  loader.load('shape.glb', function (gltf) {
    scene.add(gltf.scene)
    const material = new THREE.MeshLambertMaterial({ color: 0xcccccc })
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.castShadow = false
    directionalLight.position.set(-2, 4, -2)
    directionalLight.target = gltf.scene
    renderer.setClearColor(0xffffff, 0)
    scene.add(directionalLight)
    scene.traverse(function (child) {
      // @ts-ignore
      child.material = material
    })
    render()
  })

  function render() {
    var timer = Date.now() * 0.0002
    camera.position.x = Math.cos(timer) * 10
    camera.position.z = Math.sin(timer) * 10
    camera.lookAt(new THREE.Vector3(0, 1, 0))

    counter += 0.01
    customPass.uniforms['amount'].value = counter

    requestAnimationFrame(render)
    composer.render()
  }
}

export default sceneSetup
