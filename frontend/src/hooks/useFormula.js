import { useContext } from "react"
import { OutputWaveContext } from "../context/OutputWaveContext"
import { OutputResponseContext } from '../context/OutputResponseContext';


const useFormula = () => {
    const {draw} = useContext(OutputWaveContext)
    const {responseLPF, responseHPF} = useContext(OutputResponseContext)
    let fc=0;
    const LPFRCFormula = (freq, resistor, capacitor, vpp, phase, tmax ) => {
        fc = 1/(2*Math.PI*resistor*capacitor)
        responseLPF(fc)
        if(fc > Number(freq)) {
            draw(freq, vpp, phase, tmax)

        }else if(fc + 3 > Number(freq)) {
            console.log(fc < Number(freq) +3)
            draw(Number(freq) +3, vpp, phase, tmax)
        } else if(fc < Number(freq)) {
            console.log(fc)
            console.log(Number(freq) + 3)
            draw(0, vpp, phase, tmax)
        }
        if(document.querySelector('.keterangan')) {
            document.querySelector('.keterangan').innerHTML = `Berhasil diubah! <br> fc: ${fc.toFixed(2)} Hz <br> R: ${resistor}Ω <br> kapasitor: ${capacitor} F`
        }
    }
    
    const LPFRLFormula = (freq, resistor, induktor, vpp, phase, tmax ) => {
        fc = resistor/(2*Math.PI*induktor)
        responseLPF(fc)
        if(  fc > Number(freq)) {
            draw(freq, vpp, phase, tmax)
            console.log(fc)
            console.log(Number(freq))
        } else if(fc + 3 > Number(freq)) {
            console.log(fc)
            console.log(fc < Number(freq) +3)
            draw(Number(freq) +3, vpp, phase, tmax)
        } else if(fc < Number(freq)) {
            console.log(fc)
            console.log(Number(freq) + 3)
            draw(0, vpp, phase, tmax)
        }
        if(document.querySelector('.keterangan')) {
            document.querySelector('.keterangan').innerHTML = `Berhasil diubah! <br> fc: ${fc.toFixed(2)} Hz <br> R: ${resistor}Ω <br> Induktor: ${induktor} H`
        }
    }
    const HPFRCFormula = (freq, resistor, capacitor, vpp, phase, tmax  ) => {
        fc = 1/(2*Math.PI*resistor*capacitor)
        responseHPF(fc, fc-3)
        if(fc < Number(freq)) {
            draw(freq, vpp, phase, tmax)
        } else if(fc - 3 < Number(freq)){
            draw(freq, vpp, phase, tmax)
        } else if(fc > Number(freq)) {
            draw(0, vpp, phase, tmax)
        }
        if(document.querySelector('.keterangan')) {
            document.querySelector('.keterangan').innerHTML = `Berhasil diubah! <br> fc: ${fc.toFixed(2)} Hz <br> R: ${resistor}Ω <br> kapasitor: ${capacitor} F`
        }
    }

    const HPFRLFormula = (freq, resistor, induktor, vpp, phase, tmax  ) => {
        fc = resistor/(2*Math.PI*induktor)
        responseHPF(fc, fc-3)
        if(fc < Number(freq)) {
            draw(freq, vpp, phase, tmax)
        } else if(fc - 3 < Number(freq)){
            draw(freq, vpp, phase, tmax)
        } else if(fc > Number(freq)) {
            draw(0, vpp, phase, tmax)
        }
        if(document.querySelector('.keterangan')) {
            document.querySelector('.keterangan').innerHTML = `Berhasil diubah! <br> fc: ${fc.toFixed(2)} Hz <br> R: ${resistor}Ω <br> kapasitor: ${induktor} H`
        }
    }

    return {
        LPFRCFormula,
        LPFRLFormula,
        HPFRCFormula,
        HPFRLFormula,
    };
}
 
export default useFormula;