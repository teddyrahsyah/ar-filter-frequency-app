import axios from 'axios';
import { useContext } from 'react';
import useFormula from '../hooks/useFormula';
import { ModuleContext } from '../context/ModuleContext';
import { useEffect } from 'react';

const useFetchAR = (modulId, title, indikatorValue, osiloskopValue) => {

    const {LPFRCFormula, HPFRCFormula, fc} = useFormula()
    const {getDetailModule} = useContext(ModuleContext)

    useEffect(() => {getDetailModule(modulId)}, [])

    const checkLab = () => {
        if(title !== undefined) {
          if (title.includes("HPF RC")) {
            LPFRCFormula(
              parseFloat(indikatorValue.frequencyValue),
              parseFloat(indikatorValue.resistorValue),
              parseFloat(indikatorValue.kapasitorValue)
            )
          } else if (title.includes("LPF RL")) {
            LPFRCFormula(
              parseFloat(indikatorValue.frequencyValue),
              parseFloat(indikatorValue.resistorValue),
              parseFloat(indikatorValue.kapasitorValue)
            )
          }
        }
        if(title !== undefined){
            if(title.includes("HPF RC")) {
                HPFRCFormula(
                    parseFloat(indikatorValue.frequencyValue), 
                    parseFloat(indikatorValue.resistorValue), 
                    parseFloat(indikatorValue.kapasitorValue),
                    parseFloat(osiloskopValue.vppValue),
                    parseFloat(osiloskopValue.phaseValue),
                    parseFloat(osiloskopValue.tMaxValue),
                )
                console.log('vpp: ' + osiloskopValue.vppValue)
            } else if(title.includes("LPF RL")) {
                LPFRCFormula(
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