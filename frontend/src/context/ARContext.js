import { createContext } from "react";
import * as THREE from 'three'
import { GLTFLoader } from '../Loaders/GLTFLoader'
import { OrbitControls } from "../controller/OrbitControls";

import osiloskop from '../asset/osiloskop_v5.gltf'
import frequencyGenerator from '../asset/frekuensi_generator_v4.gltf'
import filter from '../asset/LPF_RC.gltf'

export const ARContext = createContext();

export const ARContextProvider = ({ children }) => {

    const { XRWebGLLayer } = window;
    let session, renderer, camera;
    let reticle, currentModel;
    let outputContainer, group, frequencyCounterContainer;
    let imageMaterialOutput, imageMaterialFrequency;


    const activateAR = async () => {

        // create canvas, camera, renderer, scene
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl', {xrCompatible: true})
        const scene = new THREE.Scene();

        document.querySelector('.ar-container').classList.add('ar')
        document.querySelector('.widgets').classList.add('ar')
        
        renderer = new THREE.WebGLRenderer({
            alpha: true,
            preserveDrawingBuffer: true,
            canvas: canvas,
            context: gl
        })
        renderer.autoClear = false;
        renderer.outputEncoding = THREE.sRGBEncoding;

        camera  = new THREE.PerspectiveCamera()
        camera.matrixAutoUpdate = false;

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10,15,10);
        scene.add(light);

        // controller for rotating object        
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 2;
        controls.maxDistance = 10;
        controls.target.set(0, 0, -0.2);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        // create new AR session;
        session = await navigator.xr.requestSession('immersive-ar', {
            requiredFeatures: ['hit-test', 'dom-overlay'],
            domOverlay: {root: document.body}
        })
        session.updateRenderState({ baseLayer: new XRWebGLLayer(session, gl)})

        const referenceSpace = await session.requestReferenceSpace('local');
        const viewerSpace = await session.requestReferenceSpace('viewer');
        const hitTestSource = await session.requestHitTestSource({ space: viewerSpace });

        // rendering image texture
        const imageTextureLoader = new THREE.TextureLoader();
        const addImage = () => {
            imageMaterialOutput = new THREE.MeshBasicMaterial({
                map: imageTextureLoader.load(localStorage.getItem('imageOutput')),
                side: THREE.FrontSide
            })

            return imageMaterialOutput
        }
        const addImageFreq = () => {
            imageMaterialFrequency = new THREE.MeshBasicMaterial({
                map: imageTextureLoader.load(localStorage.getItem('imageFrequency')),
                side: THREE.FrontSide
            })

            return imageMaterialFrequency
        }

        // load 3d model
        const loader = new GLTFLoader();
        loader.load("https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf" , gltf => {
            reticle = gltf.scene;
            reticle.visible = false;
            scene.add(reticle)
        })
        // loading AR Object
        const loadOsiloskopModel = () => {
            loader.load(osiloskop, (gltf) => {
                currentModel = gltf.scene;
                currentModel.visible = false;
                group = new THREE.Group();
                outputContainer = new THREE.Mesh(new THREE.PlaneGeometry(0.2,0.18), addImage());
                outputContainer.visible = false
                currentModel.attach(outputContainer)
                // console.log(currentModel)
                // group.add(outputContainer);
                // group.add( currentModel );                
                scene.add(currentModel)
            })
        }
        
        const loadFreqGenModel = () => {
            loader.load(frequencyGenerator, (gltf) => {
                currentModel = gltf.scene;
                currentModel.visible = false;
                group = new THREE.Group();
                frequencyCounterContainer = new THREE.Mesh(new THREE.PlaneGeometry(0.09,0.06), addImageFreq());
                frequencyCounterContainer.visible = false
                console.log(frequencyCounterContainer)
                group.add(frequencyCounterContainer);
                group.add( currentModel );
                scene.add(group)
            })
        }
        
        const loadFilterModel = (model) => {
            loader.load(model, (gltf) => {
                currentModel = gltf.scene;
                currentModel.visible = false;
                group = new THREE.Group();
                group.add( currentModel );
                scene.add(group)
            })
        }

        // toggle for the clicked object
        const clickedToggleARObject = (element) => {
            document.querySelectorAll('.ar-object').forEach(object => {
                object.classList.remove('clicked')
            })
            element.classList.add('clicked')
        }

        document.querySelectorAll('.ar-object').forEach(arObject => {
            arObject.addEventListener('click', (e) => {
                if(e.target.parentNode.id === 'frequencyGenerator') {
                    loadFreqGenModel()
                    clickedToggleARObject(e.target.parentNode)
                } else if(e.target.parentNode.id === 'filter') {
                    loadFilterModel(filter)
                    clickedToggleARObject(e.target.parentNode)
                } else if(e.target.parentNode.id === 'osiloskop') {
                    loadOsiloskopModel()
                    clickedToggleARObject(e.target.parentNode)
                }
            })
        })

        // place AR object
        document.querySelector('.place-btn').addEventListener('click', () => {
            if(reticle.visible){
                currentModel.visible = true;
                currentModel.castShadow = true
                currentModel.position.setFromMatrixPosition(reticle.matrix);
                if(currentModel.children[0].name === 'osiloskop'){
                    // outputContainer.position.set(reticle.position.x - 0.08, reticle.position.y + 0.12, reticle.position.z + 0.08);
                    outputContainer.position.set(reticle.position.x, reticle.position.y, reticle.position.z + 0.1);
                }
                if(currentModel.children[0].name === "frequency_generator"){
                    frequencyCounterContainer.position.set(reticle.position.x - 0.09, reticle.position.y + 0.2, reticle.position.z + 0.25);
                }
            }
        })

        // run btn
        document.querySelector('.run-btn').addEventListener('click', () => {
            outputContainer.visible = true
            frequencyCounterContainer.visible = true
            imageMaterialFrequency.map = imageTextureLoader.load(localStorage.getItem('imageFrequency'))
            imageMaterialOutput.map = imageTextureLoader.load(localStorage.getItem('imageOutput'))
        })

        // rotate object
        const rotateObject = degree => {
            if(currentModel && reticle.visible) currentModel.children.forEach(child => {
                // child.rotation.y += degree
                child.rotateOnAxis(new THREE.Vector3(0,1,), degree); 
            })
        }
 
        document.querySelector('.rotate-left').addEventListener('click', () => rotateObject(-0.1)) 
        document.querySelector('.rotate-right').addEventListener('click', () => rotateObject(0.1)) 

        const onXRFrame = (time, frame) => {
            session.requestAnimationFrame(onXRFrame);

            gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer);

            const pose = frame.getViewerPose(referenceSpace);
            if(pose){
                const view = pose.views[0];
                const viewport = session.renderState.baseLayer.getViewport(view);

                renderer.setSize(viewport.width, viewport.height);

                camera.matrix.fromArray(view.transform.matrix);
                camera.projectionMatrix.fromArray(view.projectionMatrix);
                camera.updateMatrixWorld(true);
                
                const hitTestResults = frame.getHitTestResults(hitTestSource);

                if (hitTestResults.length > 0) {
                    const hitPose = hitTestResults[0].getPose(referenceSpace);
                    reticle.visible = true;
                    reticle.position.set(hitPose.transform.position.x, hitPose.transform.position.y, hitPose.transform.position.z)
                    reticle.updateMatrixWorld(true);
                }
                renderer.render(scene, camera);
            }
        }
        session.requestAnimationFrame(onXRFrame)
        controls.addEventListener('change', onXRFrame);

        document.querySelector('.close-btn').addEventListener('click', () => {
            session.end();
            document.querySelector('.ar-container').classList.remove('ar')
            document.querySelector('.widgets').classList.remove('ar')
            localStorage.clear()

            // clearing menu choice
            document.querySelectorAll('.ar-object').forEach(object => {
                object.classList.remove('clicked')
            })

            currentModel = null
            
            renderer.setSize(window.innerWidth, window.innerHeight)
        })
    }

    return (
        <ARContext.Provider value={{ activateAR }}>
            { children }
        </ARContext.Provider>
    )
}