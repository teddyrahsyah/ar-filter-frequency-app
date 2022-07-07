import { createContext } from "react";

export const OutputResponseContext = createContext()

export const OutputResponseProvider = ({children}) => {
    
    const responseLPF = (freq) => {
        const canvas = document.querySelector('#canvasResponse');
    
        const canvasContext=canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvasContext.beginPath();
        canvasContext.moveTo(0, canvas.height/3)
        canvasContext.lineWidth = 4
        if(canvas.width < freq){
            for(let i = 0; i <= Math.floor(canvas.width -100); i++){
                canvasContext.lineTo(i, canvas.height/3)
                if(i === Math.floor(canvas.width -100)){
                    canvasContext.lineTo(i,canvas.height -20)
                    canvasContext.font = "20px Georgia";
                    canvasContext.fillText(freq, i - 10, canvas.height);
                }
            }
        } else if(canvas.width> freq) {
            for(let i = 0; i <= freq; i++){
                canvasContext.lineTo(i, canvas.height/3)
                // console.log(i)
                if(i === freq){
                    canvasContext.lineTo(i,canvas.height -20)
                    canvasContext.font = "20px Georgia";
                    canvasContext.fillText(freq, i - 10, canvas.height);
                }
            }
        }
        canvasContext.stroke()
    }
    return (
        <OutputResponseContext.Provider value={{responseLPF}}>
            {children}
        </OutputResponseContext.Provider>
    )
}