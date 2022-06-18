import html2canvas from 'html2canvas';
import { useContext, useEffect, useState } from 'react';
import { OutputWaveContext } from '../context/OutputWaveContext';
import useCapture from '../hooks/useCapture';

const OutputWave = () => {
    
    const {waveGenerator} = useContext(OutputWaveContext)
    const { capture } = useCapture()

    useEffect(() => {
        waveGenerator()
    },[])

    setTimeout(() => {
        capture()
    },[5000])
    return ( 
        <div className='output-container'>
            <div className="output-wave"></div>
        </div>
    );
}
 
export default OutputWave;