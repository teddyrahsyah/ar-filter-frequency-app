import axios from 'axios';
import { useContext } from 'react';
import useFormula from '../hooks/useFormula';
import { ModuleContext } from '../context/ModuleContext';
import { useEffect } from 'react';

const useFetchAR = (modulId, title, indikatorValue) => {

    const {LPFRCFormula, LPFRLFormula} = useFormula()
    const {getDetailModule, labList} = useContext(ModuleContext)

    useEffect(() => {getDetailModule(modulId)}, [])
    console.log(indikatorValue)

    const checkLab = () => {
        // console.log(typeof title)
        if(title.includes("LPF RC")) {
            LPFRCFormula(
                parseFloat(indikatorValue.frequencyValue), 
                parseFloat(indikatorValue.resistorValue), 
                parseFloat(indikatorValue.kapasitorValue)
            )
        } else if(title.includes("LPF RL")) {
            LPFRLFormula(
                parseFloat(indikatorValue.frequencyValue), 
                parseFloat(indikatorValue.resistorValue), 
                parseFloat(indikatorValue.kapasitorValue)
            )
        }
        
    }

    return{labList, checkLab};
}
 
export default useFetchAR;