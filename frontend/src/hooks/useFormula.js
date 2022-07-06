import { useContext } from "react"
import { OutputWaveContext } from "../context/OutputWaveContext"


const useFormula = () => {
    const {draw} = useContext(OutputWaveContext)
    let fc=0;
    const LPFRCFormula = (freq, resistor, capacitor ) => {
        fc = 1/(2*Math.PI*resistor*capacitor)
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
        fc = resistor/(2*Math.PI*induktor)
        if(fc > Number(freq)){
            draw(freq)
        } else if(fc < Number(freq)){
            draw(0)
        }
    }

    const LPFPasifFormula = (freq, resistor, capacitor, inductor) => {
        fc = 1/(2*Math.PI*Math.sqrt(inductor*capacitor))
        if(fc > Number(freq)){
            draw(freq)
        } else if(fc < Number(freq)){
            draw(0)
        }
    }

    const HPFRCFormula = (freq, resistor, capacitor, vpp, phase, tmax ) => {
        fc = 1/(2*Math.PI*resistor*capacitor)
        if(fc < Number(freq)){
            draw(freq, vpp, phase, tmax)
            console.log(`phase: ${phase}`)
            console.log(`vpp: ${vpp}`)
        } else if(fc > Number(freq)){
            draw(0, vpp, phase, tmax)
            console.log(`phase: ${phase}`)
            console.log(`vpp: ${vpp}`)
        }
        if(document.querySelector('.keterangan')) document.querySelector('.keterangan').innerHTML = `fc: ${fc.toFixed(2)} Hz`
    }

    const HPFRLFormula = (freq, resistor, induktor ) => {
        fc = 1/(2*Math.PI*resistor*induktor)
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
        HPFRLFormula,
        LPFPasifFormula
    };
}
 
export default useFormula;