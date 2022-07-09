import axios from 'axios';
import { useContext } from 'react';
import useFormula from '../hooks/useFormula';
import { ModuleContext } from '../context/ModuleContext';
import { useEffect } from 'react';

const useFetchAR = (modulId, title, indikatorValue) => {

    const {LPFRCFormula, HPFRCFormula, fc, LPFRLFormula, HPFRLFormula, BPFFormula, BSFFormula} = useFormula()
    const {getDetailModule} = useContext(ModuleContext)

    useEffect(() => {getDetailModule(modulId)}, [])

    const checkLab = () => {
        if(title !== undefined){
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
                    parseFloat(indikatorValue.induktorValue)
                )
            } else if(title.includes("HPF RC")) {
                HPFRCFormula(
                    parseFloat(indikatorValue.frequencyValue), 
                    parseFloat(indikatorValue.resistorValue), 
                    parseFloat(indikatorValue.kapasitorValue)
                )
            } else if(title.includes("HPF RL")) {
                HPFRLFormula(
                    parseFloat(indikatorValue.frequencyValue), 
                    parseFloat(indikatorValue.resistorValue), 
                    parseFloat(indikatorValue.induktorValue)
                )
            }  else if(title.includes("Band Pass")) {
                BPFFormula(
                    parseFloat(indikatorValue.frequencyValue), 
                    parseFloat(indikatorValue.resistorValue), 
                    parseFloat(indikatorValue.resistorTwoValue), 
                    parseFloat(indikatorValue.kapasitorValue), 
                    parseFloat(indikatorValue.kapasitorTwoValue),
                )
            } else if(title.includes("Band Stop")) {
                BSFFormula(
                    parseFloat(indikatorValue.frequencyValue), 
                    parseFloat(indikatorValue.resistorValue), 
                    parseFloat(indikatorValue.kapasitorValue)
                )
            }
        }

    }

    return{checkLab, fc};
}

export default useFetchAR;