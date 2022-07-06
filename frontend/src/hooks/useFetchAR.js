import axios from 'axios';
import { useContext } from 'react';
import useFormula from '../hooks/useFormula';
import { ModuleContext } from '../context/ModuleContext';
import { useEffect } from 'react';

const useFetchAR = (modulId, title, indikatorValue) => {

    const {LPFRCFormula, LPFRLFormula} = useFormula()
    const {getDetailModule} = useContext(ModuleContext)

    useEffect(() => {getDetailModule(modulId)}, [])
    console.log(indikatorValue)

    const checkLab = () => {
        console.log(title)
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
    }

    return{checkLab};
}

export default useFetchAR;