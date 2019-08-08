(function() {
// initialize variables
let scene, camera, renderer, container, stats
let aspectRatio, HEIGHT, WIDTH, fieldOfView, nearPlane, farPlane, mouseX, mouseY, windowHalfX, windowHalfY, geometry, starStuff, materialOptions, stars

init()
animate()

function init() {
  container = document.createElement('div')
  document.body.appendChild(container)
  document.body.style.overflow='hidden'

  HEIGHT = window.innerHeight
  WIDTH = window.innerWidth
  windowHalfX = WIDTH / 2
  windowHalfY = HEIGHT / 2
  mouseX = 0
  mouseY = 0

  // camera frustrum variables
  aspectRatio = WIDTH / HEIGHT
  fieldOfView = 75 // vertical field of view
  nearPlane = 1
  farPlane = 1000

  camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
  camera.position.z = farPlane / 2

  scene = new THREE.Scene({ antialias: true })
  scene.fog = new THREE.FogExp2 (0x000000, 0.0003)

  generateStars()

  // confirm browser support
  if (webGLSupport()) {
    renderer = new THREE.WebGLRenderer({ alpha: true })
  } else {
    renderer = new THREE.CanvasRenderer()
  }

  renderer.setClearColor(0x000011, 1)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(WIDTH, HEIGHT)
  container.appendChild(renderer.domElement)

  stats = new Stats()
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.top = '0px'
  stats.domElement.style.right = '0px'
  container.appendChild(stats.domElement)

  window.addEventListener('resize', onWindowResize, false)
  document.addEventListener('mousemove', onMouseMove, false)
}

function animate() {
  requestAnimationFrame(animate)
  render()
  stats.update()
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.0005
  camera.position.y += (-mouseY - camera.position.y) * 0.0005
  camera.lookAt(scene.position)
  renderer.render(scene, camera)
}

function webGLSupport() {
  try {
    let canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch(error) {
      return false
  }
}

function onWindowResize() {
  let WIDTH = window.innerWidth
  let HEIGHT = window.innerHeight

  camera.aspect = aspectRatio
  camera.updateProjectionMatrix()
  renderer.setSize(WIDTH, HEIGHT)
}

function generateStars() {
  let starQuantity = 45000
  geometry = new THREE.SphereGeometry(1000, 100, 50)

  materialOptions = {
    size: 1.0,
    transparency: true,
    opacity: 0.7
  }

  starStuff = new THREE.PointCloudMaterial(materialOptions)

  for (let i = 0; i < starQuantity; i++) {
    let starVertex = new THREE.Vector3()

    // disperse star
    starVertex.x = Math.random() * 2000 - 1000
    starVertex.y = Math.random() * 2000 - 1000
    starVertex.z = Math.random() * 2000 - 1000

    geometry.vertices.push(starVertex)
  }

  stars = new THREE.PointCloud(geometry, starStuff)
  scene.add(stars)
}

function onMouseMove(e) {
  mouseX = e.clientX - windowHalfX
  mouseY = e.clientY - windowHalfY
}

})()

$(function(){
  $('#content').scroll(function() {
    let winTop = $('#content').scrollTop()
    if (winTop <= window.innerHeight * 0.55) {
      console.log('adding class')
      $("#title").addClass("sticky")
    } else {
      console.log('removing class')
      $("#title").removeClass("sticky")
    }
  })
})