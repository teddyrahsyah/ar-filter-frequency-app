import axios from 'axios';
import { useContext } from 'react';
import useFormula from '../hooks/useFormula';
import { ModuleContext } from '../context/ModuleContext';
import { useEffect } from 'react';

const useFetchAR = (modulId, title, indikatorValue, osiloskopValue) => {

    const {LPFRCFormula, HPFRCFormula, fc, LPFRLFormula, HPFRLFormula} = useFormula()
    const {getDetailModule} = useContext(ModuleContext)

    useEffect(() => {getDetailModule(modulId)}, [])

    const checkLab = () => {
        if(title !== undefined){
            if(title.includes("LPF RC")) {
                LPFRCFormula(
                    parseFloat(indikatorValue.frequencyValue), 
                    parseFloat(indikatorValue.resistorValue), 
                    parseFloat(indikatorValue.kapasitorValue),
                    parseFloat(osiloskopValue.vppValue),
                    parseFloat(osiloskopValue.phaseValue),
                    parseFloat(osiloskopValue.tMaxValue),
                )
            } else if(title.includes("LPF RL")) {
                LPFRLFormula(
                    parseFloat(indikatorValue.frequencyValue), 
                    parseFloat(indikatorValue.resistorValue), 
                    parseFloat(indikatorValue.induktorValue),
                    parseFloat(osiloskopValue.vppValue),
                    parseFloat(osiloskopValue.phaseValue),
                    parseFloat(osiloskopValue.tMaxValue),
                )
            } else if(title.includes("HPF RC")) {
                HPFRCFormula(
                    parseFloat(indikatorValue.frequencyValue), 
                    parseFloat(indikatorValue.resistorValue), 
                    parseFloat(indikatorValue.kapasitorValue),
                    parseFloat(osiloskopValue.vppValue),
                    parseFloat(osiloskopValue.phaseValue),
                    parseFloat(osiloskopValue.tMaxValue),
                )
            } else if(title.includes("HPF RL")) {
                HPFRLFormula(
                    parseFloat(indikatorValue.frequencyValue), 
                    parseFloat(indikatorValue.resistorValue), 
                    parseFloat(indikatorValue.induktorValue),
                    parseFloat(osiloskopValue.vppValue),
                    parseFloat(osiloskopValue.phaseValue),
                    parseFloat(osiloskopValue.tMaxValue),
                )
            }
        }

    }

    return{checkLab, fc};
}

export default useFetchAR;