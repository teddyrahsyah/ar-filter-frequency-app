import { createContext } from "react";
import * as THREE from 'three'
import { GLTFLoader } from '../Loaders/GLTFLoader'
import { OrbitControls } from "../controller/OrbitControls";
import keyboardModel from '../asset/Keyboard.gltf'
import mouseModel from '../asset/Mouse.gltf'
import monitorModel from '../asset/Monitor.gltf'
import PCModel from '../asset/PC.gltf'

export const ARContext = createContext();

export const ARContextProvider = ({ children }) => {
    const { XRWebGLLayer } = window;
    let session, renderer, camera;
    let reticle, currentModel;
    let touchDown, touchX, touchY, deltaX, deltaY;

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
       // Create another XRReferenceSpace that has the viewer as the origin.
        const viewerSpace = await session.requestReferenceSpace('viewer');
        // Perform hit testing using the viewer as origin.
        const hitTestSource = await session.requestHitTestSource({ space: viewerSpace });


        // load 3d model
        const loader = new GLTFLoader();
        loader.load("https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf" , gltf => {
            reticle = gltf.scene;
            reticle.visible = false;
            scene.add(reticle)
        })

        const loadModel = (model) => {
            loader.load(model, (gltf) => {
                currentModel = gltf.scene;
                currentModel.visible = false;
                scene.add(currentModel)
            })
        }

        function rotateObject(){
            if(currentModel && reticle.visible){
                currentModel.rotation.y += deltaY / 100;
                console.log('rotated')
            }
        }

        // rotating 3d object
        renderer.domElement.addEventListener('touchstart', function(e){
            e.preventDefault();
            touchDown=true;
            touchX = e.touches[0].pageX;
            touchY = e.touches[0].pageY;
        }, false);

        renderer.domElement.addEventListener('touchend', function(e){
            e.preventDefault();
            touchDown = false;
        }, false);

        renderer.domElement.addEventListener('touchmove', function(e){
            e.preventDefault();
            
            if(!touchDown){
                return;
            }

            deltaX = e.touches[0].pageX - touchX;
            deltaY = e.touches[0].pageY - touchY;
            touchX = e.touches[0].pageX;
            touchY = e.touches[0].pageY;

            rotateObject();

        }, false);

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
                    loadModel(keyboardModel)
                    clickedToggle(e.target.parentNode)
                } else if(e.target.parentNode.id === 'Mouse') {
                    loadModel(mouseModel)
                    clickedToggle(e.target.parentNode)
                } else if(e.target.parentNode.id === 'PC') {
                    loadModel(PCModel)
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
            }
        })

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

                if (hitTestResults.length > 0 && reticle) {
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