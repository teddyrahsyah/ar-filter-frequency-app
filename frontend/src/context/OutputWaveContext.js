import { createContext } from "react";

export const OutputWaveContext = createContext();

export const OutputWaveContextProvider = ({ children }) => {
    const waveGenerator = () => {
        const canvas = document.createElement('canvas');
        canvas.style.backgroundColor= "#ffffff";
        document.querySelector('.output-wave').appendChild(canvas)
        const canvasContext = canvas.getContext('2d');
    
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        const waveFreq = 0.002
    
        let inc = waveFreq
        canvasContext.moveTo(0, canvas.height/2)
        for(let i = 0; i < canvas.width; i++){
            canvasContext.lineTo(i, canvas.height/2 + Math.sin(i * 0.04 + inc)*100)
        }
        canvasContext.stroke()
        inc +=waveFreq
    }
    return (
        <OutputWaveContext.Provider value={{waveGenerator}}>
            {children}
        </OutputWaveContext.Provider>
    )
}