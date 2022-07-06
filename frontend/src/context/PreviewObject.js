import * as THREE from 'three'
import { createContext } from 'react';
import { OrbitControls } from "../controller/OrbitControls";
import { GLTFLoader } from '../Loaders/GLTFLoader'

import frequencyGeneratorModel from '../asset/frekuensi_generator_v4.gltf'
import osiloskop from '../asset/osiloskop_v5.gltf'
import LPFRCModel from '../asset/LPF_RC_cables.gltf'

export const PreviewObject = createContext()

export const PreviewObjectProvider = ( { children } ) => {

    const showObject = (modelAR) => {
        const previewScene = new THREE.Scene();
        const previewCamera = new THREE.PerspectiveCamera(5, window.innerWidth/window.innerWidth, 0.1, 100);
        
        const previewRenderer = new THREE.WebGLRenderer();
        const controls = new OrbitControls(previewCamera, previewRenderer.domElement);
        previewRenderer.setSize(window.innerWidth -40, window.innerWidth -40)
        previewRenderer.setPixelRatio(2)
        
        const previewLight = new THREE.DirectionalLight(0xffffff, 1);
        previewLight.position.set(1, 1, 1);
        previewScene.add(previewLight)
        const backLight = new THREE.DirectionalLight(0xffffff, 1);
        backLight.position.set(-1, -1, -1);
        previewScene.add(backLight)
    
        document.querySelector('.canvas-container').appendChild(previewRenderer.domElement)

        let object;
        const loadModel = (model) => {
            // load 3d model
            const loader = new GLTFLoader();
            loader.load(model , gltf => {
                object = gltf.scene;
                previewScene.add(object)
            })
        }
        loadModel(modelAR)
        document.querySelectorAll('.object-list').forEach((objek) => {
            objek.addEventListener('click', (e) => {
                if(object !== null) previewScene.remove(object)
                console.log(object)

                if(e.target.id === 'frequencyGeneratorModel') loadModel(frequencyGeneratorModel)
                else if(e.target.id === 'osiloskop') loadModel(osiloskop)
                else if(e.target.id === 'LPFRCModel') loadModel(modelAR)
                
            })
            
        })
       
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