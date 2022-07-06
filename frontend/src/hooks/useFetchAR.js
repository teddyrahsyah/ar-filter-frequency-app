import axios from 'axios';
import { useContext } from 'react';
import useFormula from '../hooks/useFormula';
import { ModuleContext } from '../context/ModuleContext';
import { useEffect } from 'react';

const useFetchAR = (modulId, title, indikatorValue) => {

    const {LPFRCFormula, HPFRCFormula, fc} = useFormula()
    const {getDetailModule} = useContext(ModuleContext)

    useEffect(() => {getDetailModule(modulId)}, [])

    const checkLab = () => {
<<<<<<< HEAD
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
=======
        if(title !== undefined){
            if(title.includes("HPF RC")) {
                HPFRCFormula(
                    parseFloat(indikatorValue.frequencyValue), 
                    parseFloat(indikatorValue.resistorValue), 
                    parseFloat(indikatorValue.kapasitorValue)
                )
            } else if(title.includes("LPF RL")) {
                LPFRCFormula(
                    parseFloat(indikatorValue.frequencyValue), 
                    parseFloat(indikatorValue.resistorValue), 
                    parseFloat(indikatorValue.kapasitorValue)
                )
            }
        }
        
>>>>>>> fab2607718073f203742c8f794ff4efe7a1a0a6b
    }

    return{checkLab, fc};
}

export default useFetchAR;