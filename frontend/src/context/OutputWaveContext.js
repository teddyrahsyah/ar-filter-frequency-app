import { createContext } from "react";
import * as THREE from 'three'

export const OutputWaveContext = createContext();

export const OutputWaveContextProvider = ({ children }) => {
    const waveGenerator = () => {
        
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera()
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(300, 500);

        const canvas = document.createElement('canvas');
        canvas.style.backgroundColor= "#ffffff";
        // document.querySelector('.widgets').appendChild(canvas)
        scene.add(canvas)
        const canvasContext = canvas.getContext('2d');
    
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight/2;
    
        const waveFreq = 0.02
    
        let inc = waveFreq
        const animate = () => {
            requestAnimationFrame(animate)
            canvasContext.clearRect(0, 0, canvas.width, canvas.height)
            
            canvasContext.beginPath();
            canvasContext.moveTo(0, canvas.height/2)
    
            for(let i = 0; i < canvas.width; i++){
                canvasContext.lineTo(i, canvas.height/2 + Math.sin(i * 0.02 + inc)*200)
            }
            canvasContext.stroke()
            inc +=waveFreq
            renderer.render(scene, camera)
        }
    
        animate()
    }
    return (
        <OutputWaveContext.Provider value={{waveGenerator}}>
            {children}
        </OutputWaveContext.Provider>
    )
}