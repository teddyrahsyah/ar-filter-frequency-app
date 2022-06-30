import { useContext } from "react"
import { OutputWaveContext } from "../context/OutputWaveContext"


const useFormula = () => {
    const {draw} = useContext(OutputWaveContext)
    const LPFRCFormula = (freq, resistor=1000, capacitor=0.00000001 ) => {
        const fc = 1/(2*Math.PI*resistor*capacitor)
        if(fc > Number(freq)){
            draw(freq)
        } else if(fc < Number(freq)){
            draw(0)
        }
    }

    return {LPFRCFormula};
}
 
export default useFormula;