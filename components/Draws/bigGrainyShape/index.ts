import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let width = 0,
  height = 0

const sceneSetup = (container: React.RefObject<HTMLDivElement>) => {
  const wrapper = container.current
  if (!wrapper) return

  const { clientWidth, clientHeight } = wrapper
  width = clientWidth
  height = clientHeight
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(15, width / height, 0.1, 2000)
  camera.position.y = 6
  camera.position.z = -6

  const renderer = new THREE.WebGLRenderer({ alpha: true })

  renderer.setSize(width, height)

  wrapper.appendChild(renderer.domElement)
  scene.background = null

  scene.add(new THREE.AmbientLight(0x666666))

  // SHADER
  var composer = new EffectComposer(renderer)
  var renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  // @ts-ignore
  var vertShader = ` 
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix 
        * modelViewMatrix 
        * vec4( position, 1.0 );
    }
  `
  // @ts-ignore
  var fragShader = `
    uniform float amount;
    uniform sampler2D tDiffuse;
    varying vec2 vUv;

    float random( vec2 p )
    {
      vec2 K1 = vec2(
        23.14069263277926, // e^pi (Gelfond's constant)
        2.665144142690225 // 2^sqrt(2) (Gelfondâ€“Schneider constant)
      );
      return fract( cos( dot(p,K1) ) * 12345.6789 );
    }

    void main() {

      vec4 color = texture2D( tDiffuse, vUv );
      vec2 uvRandom = vUv;
      uvRandom.y *= random(vec2(uvRandom.y,amount));
      color.rgb += random(uvRandom)*0.15;
      gl_FragColor = vec4( color  );
    }
  `
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

  // RESIZE
  new ResizeObserver(props => {
    if (!props[0]) return
    const { width, height } = props[0].contentRect
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }).observe(wrapper)

  //RENDER LOOP
  const loader = new GLTFLoader()
  loader.load(
    'https://ipfs.io/ipfs/QmUTQ2C1GigXYq64oZvaJ16twuUxUteU3nY4dHbWiABBWu',
    function (gltf) {
      scene.add(gltf.scene)
      const material = new THREE.MeshLambertMaterial({ color: 0xe2e3e5 })
      const directionalLight = new THREE.DirectionalLight(0xccccbb, 1)
      directionalLight.castShadow = false
      directionalLight.position.set(-2, 4, -2)
      directionalLight.target = gltf.scene
      renderer.setClearColor(0xffffff, 0)
      scene.add(directionalLight)
      scene.traverse(function (child) {
        ;(child as THREE.Mesh).material = material
      })
      render()
    }
  )

  function render() {
    var timer = Date.now() * 0.0002
    camera.position.x = Math.cos(timer) * 10
    camera.position.z = Math.sin(timer) * 10
    camera.lookAt(new THREE.Vector3(0, 1, 0))

    counter += 0.01
    if (counter === 300) {
      counter = 0
    }
    customPass.uniforms['amount'].value = counter

    requestAnimationFrame(render)
    composer.render()
  }
}

export default sceneSetup
