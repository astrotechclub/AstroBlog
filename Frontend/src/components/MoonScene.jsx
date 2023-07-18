import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import my_3d_model from "../assets/3d_model/moon.glb";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const MoonScene = () => {
    const canvasRef = useRef();
    const moon_color = 0x730B6F;

    useEffect(() => {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth * .4 / window.innerHeight, 0.01, 1000);
        var renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth * .4, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        document.getElementById("illustration").appendChild(renderer.domElement);
        var loader = new GLTFLoader();
        var obj = undefined;
        loader.load(my_3d_model, (gltf) => {
            scene.add(gltf.scene);
        });
        var light = new THREE.HemisphereLight(0xffffff, 0x000000, 5);
        scene.add(light);
        var pink = new THREE.AmbientLight(moon_color, 4);
        scene.add(pink);
        camera.position.set(0, 0, 200);
        let controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.addEventListener('change', () => {
            renderer.render(scene, camera);
        });
        function animate() {
            requestAnimationFrame(animate);
            if (obj !== undefined) obj.rotateY(0.002);
            renderer.render(scene, camera);
        }
        setTimeout(() => {
            obj = scene.children[2];
            animate();
        }, 500);
    }, []);

    return <canvas ref={canvasRef} />;
};

export default MoonScene;