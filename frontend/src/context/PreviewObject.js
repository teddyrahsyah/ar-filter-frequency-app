import * as THREE from 'three'
import { createContext } from 'react';
import { OrbitControls } from "../controller/OrbitControls";
import { GLTFLoader } from '../Loaders/GLTFLoader'

import frequencyGeneratorModel from '../asset/frekuensi_generator.gltf'
import LPFRCModel from '../asset/LPF_RC.gltf'

export const PreviewObject = createContext()

export const PreviewObjectProvider = ( { children } ) => {

    const showObject = () => {
        const previewScene = new THREE.Scene();
        const previewCamera = new THREE.PerspectiveCamera(5, window.innerWidth/window.innerWidth, 0.1, 100);
        
        const previewRenderer = new THREE.WebGLRenderer();
        const controls = new OrbitControls(previewCamera, previewRenderer.domElement);
        previewRenderer.setSize(window.innerWidth -40, window.innerWidth -40)
        previewRenderer.setPixelRatio(1)
        console.log(devicePixelRatio)
        
        const previewLight = new THREE.DirectionalLight(0xffffff, 1);
        previewLight.position.set(1, 1, 1);
        previewScene.add(previewLight)
        const backLight = new THREE.DirectionalLight(0xffffff, 1);
        backLight.position.set(-1, -1, -1);
        previewScene.add(backLight)
    
        document.querySelector('.canvas-container').appendChild(previewRenderer.domElement)
        
        // load 3d model
         const loader = new GLTFLoader();
         let object;
        // loader.load(frequencyGeneratorModel , gltf => {
        //     object = gltf.scene;
        //     previewScene.add(object)
        // })
        const geometry = new THREE.BoxGeometry( .1, .1, .1 );
        const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        const cube = new THREE.Mesh( geometry, material );
        previewScene.add( geometry );
        
        previewCamera.position.z = 7;
        // previewCamera.aspect(1)
        previewRenderer.setClearAlpha(0.1)
        previewRenderer.outputEncoding = THREE.sRGBEncoding;
        previewRenderer.render(previewScene, previewCamera)
    
        function renderObject() {
            requestAnimationFrame( renderObject );
            previewRenderer.render(previewScene, previewCamera);
        }
        
        renderObject();
    }

    return (
        <PreviewObject.Provider value={{ showObject }}>
            { children }
        </PreviewObject.Provider>
    )
    
}