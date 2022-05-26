import { createContext } from 'react';
import * as THREE from 'three'
import { OrbitControls } from "../controller/OrbitControls";

export const PreviewObject = createContext()

export const PreviewObjectProvider = ( { children } ) => {

    const showObject = () => {
        const previewScene = new THREE.Scene();
        const previewCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        
        const previewRenderer = new THREE.WebGLRenderer();
        previewRenderer.setSize(window.innerWidth -40, window.innerWidth -40)
        previewRenderer.setPixelRatio(devicePixelRatio)
        
        const previewLight = new THREE.DirectionalLight(0xffffff, 1);
        previewLight.position.set(0, 0, 1);
        previewScene.add(previewLight)
        const backLight = new THREE.DirectionalLight(0xffffff, 1);
        backLight.position.set(0, 0, -1);
        previewScene.add(backLight)
    
        document.querySelector('.canvas-container').appendChild(previewRenderer.domElement)

        const controls = new OrbitControls(previewCamera, previewRenderer.domElement);
        controls.minDistance = 2;
        controls.maxDistance = 10;
        controls.target.set(0, 0, -0.2);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        
        const geometryA = new THREE.PlaneGeometry( 2, 1 );
        const materialA = new THREE.MeshBasicMaterial( {
            color: 0x00ff00,
            side: THREE.DoubleSide
        } );
        const materialB = new THREE.MeshBasicMaterial( {
            color: 0x00ffff,
            side: THREE.DoubleSide
        } );
        
        const cubeA = new THREE.Mesh( geometryA, materialA );
        cubeA.position.set( 0, 1, 0 );
        
        const cubeB = new THREE.Mesh( geometryA, materialB );
        cubeB.position.set( -1, -1, 0 );
        
        //create a group and add the two cubes
        //These cubes can now be rotated / scaled etc as a group
        const group = new THREE.Group();
        group.add( cubeA );
        group.add( cubeB );
        
        previewScene.add( group );
        
        previewCamera.position.z = 7;
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