import { useContext, useEffect } from 'react';
import { OutputWaveContext } from '../../context/OutputWaveContext';
import useCapture from '../../hooks/useCapture';

const OutputWave = () => {
    
    // const {waveGenerator} = useContext(OutputWaveContext)

    // useEffect(() => {
    //     waveGenerator()
    // })
    return ( 
        <div className='output-container'>
            <div className="output-wave"></div>
            <div className="frequency-counter"></div>
        </div>
    );
}
 
export default OutputWave;