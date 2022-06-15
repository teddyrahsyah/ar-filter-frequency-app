import { createContext, useContext } from "react";
import * as THREE from 'three'
import { GLTFLoader } from '../Loaders/GLTFLoader'
import { OrbitControls } from "../controller/OrbitControls";

import keyboardModel from '../asset/Keyboard.gltf'
import mouseModel from '../asset/Mouse.gltf'
import monitorModel from '../asset/Monitor.gltf'
import PCModel from '../asset/PC.gltf'

import keyboardImg from '../asset/keyboard.png'
import mouseImg from '../asset/Mouse.jpg'

export const ARContext = createContext();

export const ARContextProvider = ({ children }) => {
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

        let imageMaterial, texture
        
        const addImage = () => {
            const imageTextureLoader = new THREE.TextureLoader();
            
            const imageTexture = sessionStorage.getItem('image')
            console.log(imageTexture)
            
            texture  = [
                imageTextureLoader.load(imageTexture),
                imageTextureLoader.load(mouseImg)
            ]
            imageMaterial = new THREE.MeshBasicMaterial({
                map: texture[1],
                side: THREE.FrontSide
            })
            box = new THREE.Mesh(new THREE.PlaneGeometry(0.47,0.29), imageMaterial);
            box.visible = false
        }

        const changeTexture = () => {
            if(imageMaterial.map === texture[1]){
                imageMaterial.map = texture[0]
            } else{
                imageMaterial.map = texture[1]
            }
        }

        const loadModel = (model) => {
            loader.load(model, (gltf) => {
                currentModel = gltf.scene;
                currentModel.visible = false;
                group = new THREE.Group();
                addImage()
                box.visible = true;
                group.add( box );
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

        // run btn
        document.querySelector('.run-btn').addEventListener('click', () => {
            console.log('clicked');
            changeTexture()
        })

        // rotate object
        const rotateObject = degree => {
            if(currentModel && reticle.visible) group.children.forEach(child =>  child.rotation.y += degree)
        }

        document.querySelector('.rotate-left').addEventListener('click', () => rotateObject(-0.1))
        document.querySelector('.rotate-right').addEventListener('click', () => rotateObject(0.1))


        // toggle for the clicked object
        const clickedToggle = (element) => {
            document.querySelectorAll('.ar-object').forEach(object => {
                object.classList.remove('clicked')
            })
            element.classList.add('clicked')
        }

        document.querySelectorAll('.ar-object').forEach(arObject => {
            arObject.addEventListener('click', (e) => {
                if(e.target.parentNode.id === 'Keyboard') {
                    loadFilterModel(keyboardModel)
                    clickedToggle(e.target.parentNode)
                } else if(e.target.parentNode.id === 'Mouse') {
                    loadFilterModel(mouseModel)
                    clickedToggle(e.target.parentNode)
                } else if(e.target.parentNode.id === 'PC') {
                    loadFilterModel(PCModel)
                    clickedToggle(e.target.parentNode)
                } else if(e.target.parentNode.id === 'Monitor') {
                    loadModel(monitorModel)
                    clickedToggle(e.target.parentNode)
                }
            })
        })

        document.querySelector('.place-btn').addEventListener('click', () => {
            
            if(reticle.visible){
                currentModel.visible = true;
                currentModel.position.setFromMatrixPosition(reticle.matrix);
                box.position.set(reticle.position.x, reticle.position.y + 0.25, reticle.position.z + 0.028);
            }
        })
        
        const onXRFrame = (time, frame) => {
            session.requestAnimationFrame(onXRFrame);
            // texture.needsUpdate = true

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
            
            renderer.setSize(window.innerWidth, window.innerHeight)
        })

    }

    return (
        <ARContext.Provider value={{ activateAR }}>
            { children }
        </ARContext.Provider>
    )
}