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

// Load the GLB model as binary data
fetch("/models/guildhall_great_hall.glb")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.arrayBuffer();
  })
  .then(arrayBuffer => {
    // Create a Blob from the arrayBuffer and load it using GLTFLoader
    const blob = new Blob([arrayBuffer], { type: 'model/gltf-binary' });
    const url = URL.createObjectURL(blob);
    
    loader.load(url, function(gltf) {
      scene.add(gltf.scene);
      URL.revokeObjectURL(url); // Clean up the URL object after loading
    }, undefined, function(error) {
      console.error('Error loading GLB model:', error);
    });
  })
  .catch(error => {
    console.error('Error fetching the GLB model:', error);
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
