import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as lilGui from "lil-gui";
import gsap from "gsap";

//Canvas
const canvas = document.querySelector("canvas");

//Scene
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(
  45, //field of view
  window.innerWidth / window.innerHeight, //aspect ratio
  0.1, //near
  1000 //far
);

//initial position of the camera of gallery room
camera.position.set(-4.9, 4.4, 1.9);
camera.rotation.set(-0.9, -0.8, -0.8);

//initial position of the camera of room 2
// camera.position.set(-0.2, -0.19, -2.4);
// camera.rotation.set(3.06, -0.09, -3.13);

camera.position.z = 2;

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);

//Orbit Control
const controls = new OrbitControls(camera, canvas);
controls.enableDumping = true;

let position = 0;

//gltf loader
const gltfLoader = new GLTFLoader();
gltfLoader.load("/model/gallery/the_great_drawing_room.glb", (gltf) => {
  console.log("Our model here!", gltf);
  const model = gltf.scene;
  scene.add(model);

  const gui = new lilGui.GUI();
  gui.add(model.position, "x").min(-100).max(100).step(0.00001).name("X Axis");
  gui.add(model.position, "y").min(-100).max(100).step(0.00001).name("Y Axis");
  gui.add(model.position, "z").min(-100).max(100).step(0.00001).name("z Axis");

  window.addEventListener("mouseup", function () {
    console.log(camera.position);
    console.log(camera.rotation);
  });

  //click để chuyển sang góc nhìn khác // gallery room
    window.addEventListener("mouseup", function () {
      switch (position) {
        case 0:
          cameraMovement(-6.0, 1.72, 1.34);
          cameraRotation(-2.75, -1.24, -2.77);
          position = 1;
          break;

        case 1:
          cameraMovement(0.48, 2.09, -2.11);
          cameraRotation(-3.12, 0.22, 3.13);
          position = 2;
          break;

        case 2:
          cameraMovement(-1.49, 1.7, 0.48);
          cameraRotation(0.44, 1.43, -0.44);
          position = 3;
          break;
        case 3:
          cameraMovement(1, 3, 0.5);
          cameraRotation(0.14, 0.8, -0.109);
          position = 0;
          break;
      }
    });
  });

  //click để chuyển sang góc nhìn khác //  room 2
  // window.addEventListener("mouseup", function () {
  //   switch (position) {
  //     case 0:
  //       cameraMovement(0.48, 1.09, -2.11);
  //       cameraRotation(-3.12, 0.22, 3.13);
  //       position = 1;
  //       break;

  //     case 1:
  //       cameraMovement(1, 1, 0.5);
  //       cameraRotation(0.14, 0.8, -0.109);
  //       position = 0;
  //       break;
  //   }
  // });

  //click để chuyển sang góc nhìn khác //  room 3
  // window.addEventListener("mouseup", function () {
  //   switch (position) {
  //     case 0:
  //       cameraMovement(0.48, 1.09, -2.11);
  //       cameraRotation(-3.12, 0.22, 3.13);
  //       position = 1;
  //       break;

  //     case 1:
  //       cameraMovement(2, 1, 0.5);
  //       cameraRotation(0.14, 0.8, -0.109);
  //       position = 0;
  //       break;
  //   }
  // });


// });

function cameraMovement(x, y, z) {
  gsap.to(camera.position, {
    x,
    y,
    z,
    duration: 3,
  });
}

function cameraRotation(x, y, z) {
  gsap.to(camera.rotation, {
    x,
    y,
    z,
    duration: 3,
  });
}

const animate = () => {
  renderer.render(scene, camera);

  //controls.update();
};

renderer.setAnimationLoop(animate);

animate();

// Light
// const ambientLight = new THREE.AmbientLight(0xffffff, 1); // màu trắng, cường độ 1
// scene.add(ambientLight);
