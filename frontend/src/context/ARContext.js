import { createContext } from "react";
import * as THREE from 'three'
import { GLTFLoader } from '../Loaders/GLTFLoader'
import { OrbitControls } from "../controller/OrbitControls";

import keyboardModel from '../asset/Keyboard.gltf'
import mouseModel from '../asset/Mouse.gltf'
import monitorModel from '../asset/Monitor.gltf'
import PCModel from '../asset/PC.gltf'
import frequencyGeneratorModel from '../asset/frekuensi_generator.gltf'
import LPFRCModel from '../asset/LPF_RC.gltf'

import mouseImg from '../asset/Mouse.jpg'
import useCapture from "../hooks/useCapture";


export const ARContext = createContext();

export const ARContextProvider = ({ children }) => {
    
    const { capture } = useCapture()
    const { XRWebGLLayer } = window;
    let session, renderer, camera;
    let reticle, currentModel;
    let box, group;


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


        // load 3d model
        const loader = new GLTFLoader();
        loader.load("https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf" , gltf => {
            reticle = gltf.scene;
            reticle.visible = false;
            scene.add(reticle)
        })

        let imageMaterial, texture, imageTexture
        
        const imageTextureLoader = new THREE.TextureLoader();
        const addImage = () => {
            
            imageTexture = localStorage.getItem('image')
            console.log(imageTexture)
            
            texture  = imageTextureLoader.load(imageTexture)
            imageMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.FrontSide
            })
            box = new THREE.Mesh(new THREE.PlaneGeometry(0.47,0.29), imageMaterial);
        }

        const changeTexture = () => {
            texture.needsUpdate = true
            // if(imageMaterial.map === texture[1]){
            //     imageMaterial.map = texture[0]
            // } else{
            //     imageMaterial.map = texture[1]
            // }
        }

        // loading AR Object
        const loadModel = (model) => {
            loader.load(model, (gltf) => {
                currentModel = gltf.scene;
                currentModel.visible = false;
                group = new THREE.Group();
                addImage()
                box.visible = false
                group.add(box);
                group.add( currentModel );                
                scene.add(group)
            })
        }
        
        const loadFilterModel = (model) => {
            loader.load(model, (gltf) => {
                currentModel = gltf.scene;
                currentModel.visible = false;
                scene.add(currentModel)
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
                if(e.target.parentNode.id === 'Keyboard') {
                    loadFilterModel(frequencyGeneratorModel)
                    clickedToggleARObject(e.target.parentNode)
                } else if(e.target.parentNode.id === 'Mouse') {
                    loadFilterModel(LPFRCModel)
                    clickedToggleARObject(e.target.parentNode)
                } else if(e.target.parentNode.id === 'PC') {
                    loadFilterModel(PCModel)
                    clickedToggleARObject(e.target.parentNode)
                } else if(e.target.parentNode.id === 'Monitor') {
                    loadModel(monitorModel)
                    clickedToggleARObject(e.target.parentNode)
                }
            })
        })

        // place AR object
        document.querySelector('.place-btn').addEventListener('click', () => {
            
            if(reticle.visible){
                currentModel.visible = true;
                currentModel.position.setFromMatrixPosition(reticle.matrix);
                console.log(currentModel)
                if(currentModel.children[0].name === 'LCD_Monitor'){
                    console.log(box)
                    box.visible = true
                    box.position.set(reticle.position.x, reticle.position.y + 0.25, reticle.position.z + 0.028);
                }
            }
        })

        // run btn
        document.querySelector('.run-btn').addEventListener('click', () => changeTexture())

        // rotate object
        const rotateObject = degree => {
            if(currentModel && reticle.visible) group.children.forEach(child =>  child.rotation.y += degree)
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
            
            renderer.setSize(window.innerWidth, window.innerHeight)
        })

    }

    return (
        <ARContext.Provider value={{ activateAR }}>
            { children }
        </ARContext.Provider>
    )
}