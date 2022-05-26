import { createContext } from "react";

export const OutputWaveContext = createContext();

export const OutputWaveContextProvider = ({ children }) => {
    const waveGenerator = () => {
        // console.log('test')
        const canvas = document.createElement('canvas');
        canvas.style.backgroundColor= "#ff0000";
        document.querySelector('.widgets').appendChild(canvas)
        const canvasContext = canvas.getContext('2d');
        console.log(canvas)
    
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
        }
    
        animate()
    }
    return (
        <OutputWaveContext.Provider value={{waveGenerator}}>
            {children}
        </OutputWaveContext.Provider>
    )
}