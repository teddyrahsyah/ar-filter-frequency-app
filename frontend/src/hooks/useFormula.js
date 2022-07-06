import { useContext } from "react"
import { OutputWaveContext } from "../context/OutputWaveContext"


const useFormula = () => {
    const {draw} = useContext(OutputWaveContext)
    let fc=0;
    const LPFRCFormula = (freq, resistor, capacitor, vpp, phase, tmax ) => {
        fc = 1/(2*Math.PI*resistor*capacitor)
        if(fc > Number(freq)) draw(freq, vpp, phase, tmax)
        else if(fc < Number(freq)) draw(0, vpp, phase, tmax)
        if(document.querySelector('.keterangan')) {
            document.querySelector('.keterangan').innerHTML = `Berhasil diubah! <br> fc: ${fc.toFixed(2)} Hz <br> R: ${resistor}Ω <br> kapasitor: ${capacitor} F`
        }
    }
    
    const LPFRLFormula = (freq, resistor, induktor, vpp, phase, tmax ) => {
        fc = resistor/(2*Math.PI*induktor)
        if(fc > Number(freq)) draw(freq, vpp, phase, tmax)
        else if(fc < Number(freq)) draw(0, vpp, phase, tmax)
        console.log(fc, freq, resistor, induktor)
        if(document.querySelector('.keterangan')) {
            document.querySelector('.keterangan').innerHTML = `Berhasil diubah! <br> fc: ${fc.toFixed(2)} Hz <br> R: ${resistor}Ω <br> Induktor: ${induktor} F`
        }
    }

    const LPFPasifFormula = (freq, resistor, capacitor, inductor, vpp, phase, tmax) => {
        fc = 1/(2*Math.PI*Math.sqrt(inductor*capacitor))
        if(fc > Number(freq)) draw(freq, vpp, phase, tmax)
        else if(fc < Number(freq)) draw(0, vpp, phase, tmax)
    }

    const HPFRCFormula = (freq, resistor, capacitor, vpp, phase, tmax ) => {
        fc = 1/(2*Math.PI*resistor*capacitor)
        if(fc < Number(freq)) draw(freq, vpp, phase, tmax)
        else if(fc > Number(freq)) draw(0, vpp, phase, tmax)
        if(document.querySelector('.keterangan')) {
            document.querySelector('.keterangan').innerHTML = `Berhasil diubah! <br> fc: ${fc.toFixed(2)} Hz <br> R: ${resistor}Ω <br> kapasitor: ${capacitor} F`
        }
    }

    const HPFRLFormula = (freq, resistor, induktor, vpp, phase, tmax  ) => {
        fc = 1/(2*Math.PI*resistor*induktor)
        if(fc < Number(freq)){
            draw(freq, vpp, phase, tmax)
        } else if(fc > Number(freq)){
            draw(0, vpp, phase, tmax)
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