import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true; // Enable XR rendering
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

document.body.appendChild(VRButton.createButton(renderer)); // Add the VR button

const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

const loader = new GLTFLoader();
loader.load('/models/guildhall_great_hall.glb', function(gltf) {
  scene.add(gltf.scene);
}, undefined, function(error) {
  console.error(error);
});

camera.position.set(0, 2, 5); // Position the camera

const controls = new FirstPersonControls(camera, renderer.domElement);
controls.lookSpeed = 0.01; // Set a reasonable look speed
controls.movementSpeed = 0.3; // Slow down the movement speed
controls.noFly = false; // Allow vertical movement
controls.lookVertical = true; // Enable vertical looking

function animate() {
    controls.update(0.1); // Update controls
    renderer.render(scene, camera);
}
