import { useContext } from "react"
import { OutputWaveContext } from "../context/OutputWaveContext"


const useFormula = () => {
    const {draw} = useContext(OutputWaveContext)
    const LPFRCFormula = (freq, resistor, capacitor ) => {
        const fc = 1/(2*Math.PI*resistor*capacitor)
        if(fc > Number(freq)){
            draw(freq)
        } else if(fc < Number(freq)){
            draw(0)
        }
        console.log(`fc: ${fc}`)
        console.log(`freq: ${freq}`)
        console.log(`R: ${resistor}`)
        console.log(`C: ${capacitor}`)
    }
    
    const LPFRLFormula = (freq, resistor, induktor ) => {
        const fc = 1/(2*Math.PI*resistor*induktor)
        if(fc > Number(freq)){
            draw(freq)
        } else if(fc < Number(freq)){
            draw(0)
        }
    }

    const HPFRCFormula = (freq, resistor, capacitor ) => {
        const fc = 1/(2*Math.PI*resistor*capacitor)
        if(fc < Number(freq)){
            draw(freq)
        } else if(fc > Number(freq)){
            draw(0)
        }
    }

    const HPFRLFormula = (freq, resistor, induktor ) => {
        const fc = 1/(2*Math.PI*resistor*induktor)
        if(fc < Number(freq)){
            draw(freq)
        } else if(fc > Number(freq)){
            draw(0)
        }
    }

    return {
        LPFRCFormula,
        LPFRLFormula,
        HPFRCFormula,
        HPFRLFormula
    };
}
 
export default useFormula;