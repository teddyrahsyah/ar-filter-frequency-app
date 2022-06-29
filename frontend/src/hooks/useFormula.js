import { useContext } from "react"
import { OutputWaveContext } from "../context/OutputWaveContext"


const useFormula = () => {
    const {draw} = useContext(OutputWaveContext)
    const LPFRCFormula = (freq, resistor=1000, capacitor=0.000000001 ) => {
        const fc = 1/2*Math.PI*resistor*capacitor
        if(fc > freq){
            draw(0)
        } else if( freq < fc){
            draw(freq)
        }
    }

    return {LPFRCFormula};
}
 
export default useFormula;