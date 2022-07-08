import { createContext } from "react";

export const OutputResponseContext = createContext()

export const OutputResponseProvider = ({children}) => {
    
    const responseLPF = (freq) => {
        const canvas = document.querySelector('#canvasResponse');
    
        const canvasContext=canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        for(let i = 0; i <= Math.floor(canvas.width /2); i++){
            canvasContext.beginPath();
            canvasContext.lineWidth = 3
            canvasContext.moveTo(0, canvas.height/3);
            canvasContext.lineTo(i, canvas.height/3);
            canvasContext.stroke();
            if(i === Math.floor(canvas.width/2)){
                // transition band
                canvasContext.beginPath();
                canvasContext.moveTo(i, canvas.height/3);
                canvasContext.lineTo(i+50, canvas.height - 20);
                canvasContext.stroke();
                // cutoff
                canvasContext.beginPath();
                canvasContext.moveTo(i, canvas.height/3);
                canvasContext.lineTo(i, canvas.height - 20);
                canvasContext.setLineDash([5, 3])
                canvasContext.font = "20px Arial";
                const frequency = `${freq.toFixed(2)} Hz`
                canvasContext.fillText(frequency, i - 50, canvas.height);
                canvasContext.stroke();
            }
        }
    }
    
    const responseHPF = (fc, fmax) => {
        const canvas = document.querySelector('#canvasResponse');
    
        const canvasContext=canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        for(let i = 0; i <= Math.floor(canvas.width /2); i++){
            canvasContext.beginPath();
            canvasContext.lineWidth = 3
            canvasContext.moveTo(canvas.width / 2, canvas.height/3);
            canvasContext.lineTo(canvas.width, canvas.height/3);
            canvasContext.stroke();
            if(i === Math.floor(canvas.width/2)){
                // transition band
                canvasContext.beginPath();
                canvasContext.moveTo(i, canvas.height/3);
                canvasContext.lineTo(i-50, canvas.height - 20);
                canvasContext.stroke();
                canvasContext.font = "20px Arial";
                const frequency = `${fmax.toFixed(1)} Hz`
                canvasContext.fillText(frequency, i - 150, canvas.height);
                // cutoff
                canvasContext.beginPath();
                canvasContext.moveTo(i, canvas.height/3);
                canvasContext.lineTo(i, canvas.height - 20);
                canvasContext.setLineDash([5, 3])
                canvasContext.font = "20px Arial";
                const frequencyCutoff = `${fc.toFixed(1)} Hz`
                canvasContext.fillText(frequencyCutoff, i - 50, canvas.height);
                canvasContext.stroke();
            }
        }
    }
    return (
        <OutputResponseContext.Provider value={{responseLPF, responseHPF}}>
            {children}
        </OutputResponseContext.Provider>
    )
}