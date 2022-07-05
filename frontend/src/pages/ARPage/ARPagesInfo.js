import '../../style/App.css';
import Popup from 'reactjs-popup';

import { useContext, useEffect, useState } from 'react';
import { ARContext } from '../../context/ARContext';
import { PreviewObject } from '../../context/PreviewObject';
import useCapture from '../../hooks/useCapture';
import useFormula from '../../hooks/useFormula';

// import icon
import closeIcon from '../../asset/icons/close.svg'
import rightIcon from '../../asset/icons/right.svg'
import placeAR from '../../asset/icons/place.svg'
import rotateLeftIcon from '../../asset/icons/rotate_right.svg'
import rotateRightIcon from '../../asset/icons/rotate_left.svg'
import runIcon from '../../asset/icons/run.svg'
import frequencyIcon from '../../asset/icons/wave.svg'

// import image
import frequencyGeneratorImg from '../../asset/frequency_generator.png'
import osiloskopImage from '../../asset/osiloskop.jpg'
import { useParams } from 'react-router-dom';
import useFetchAR from '../../hooks/useFetchAR';
import { ModuleContext } from '../../context/ModuleContext';

const ARPages = () => {
    const {modulId} = useParams()
    const {activateAR} = useContext(ARContext)
    const {showObject} = useContext(PreviewObject)
    const { captureOutput, capturefrequency } = useCapture()
    const {labList} = useContext(ModuleContext)
    let labTitle;
    
    const [indikatorValue, setIndikatorValue] = useState({
        frequencyValue:10000,
        resistorValue: 1000,
        kapasitorValue: 0.00000001,
        induktorValue: 0.47
    })
    if(labList.length !== 0) labList.map((lab) => { labTitle = lab.title})
    const {checkLab} = useFetchAR(modulId, labTitle, indikatorValue)
    

    const handleRadio = (e) => {
        if(e.target.value === 'frekuensi') {
            document.querySelector('.input-freq').style.display = 'block'
            document.querySelector('.input-kapasitor').style.display = 'none'
            document.querySelector('.input-resistor').style.display = 'none'
        }
        else if(e.target.value === 'kapasitor') {
            document.querySelector('.input-kapasitor').style.display = 'block'
            document.querySelector('.input-freq').style.display = 'none'
            document.querySelector('.input-resistor').style.display = 'none'
        }
        else if(e.target.value === 'resistor') {
            document.querySelector('.input-resistor').style.display = 'block'
            document.querySelector('.input-freq').style.display = 'none'
            document.querySelector('.input-kapasitor').style.display = 'none'
        }
    }

    const drawAndCapture = () => {
        checkLab()
        setTimeout(() => { 
            captureOutput()
            capturefrequency()
        }, [500] )
    }
    useEffect(() => {
        drawAndCapture()
        if(labList.length !== 0) labList.map(lab =>showObject(lab.modelAR)) 
    })

    const handleSumbit = e => {
        e.preventDefault()
        drawAndCapture()
        setIndikatorValue({
            frequencyValue: indikatorValue.frequencyValue,
            resistorValue: indikatorValue.resistorValue,
            kapasitorValue: indikatorValue.kapasitorValue
        })
    }

    return (
        <div>
            <div className="ar-container">
            {
                labList.length !== 0 ?
                labList.map(lab => (
                    <div className="ar-content">
                        <h1>{lab.title}</h1>
                        <section className="lab-description">
                            {lab.description}
                        </section>
                        <div className="show-object">
                            <h3>Object yang akan digunakan pada lab kali ini</h3>
                                <div className="object-image-list">
                                    <img id='frequencyGeneratorModel' className='object-list' src={frequencyGeneratorImg} alt="Frekuensi generator" />
                                    <img id='LPFRCModel' className='object-list' src={lab.thumbnailAR} alt="Rangkaian HPF" />
                                    <img id='osiloskop' className='object-list' src={osiloskopImage} alt="Osilator" />
                                </div> 
                            <div className="canvas-container"><div></div></div>
                        </div>
                        <button onClick={() => activateAR(lab.modelAR)} className='ar-btn btn-edited'>Start AR</button>
                    </div>
                ))
                : <div>Loading...</div>
            }
            </div>
            <div className="output-container">
                <div className="output-wave"><canvas id="canvas"></canvas></div>
                <div className="frequency-counter">{indikatorValue.frequencyValue} Hz</div>
            </div>

            {/* inside AR session */}
            <div className="widgets">
                {/* Navigation */}
                <div className="navigation">

                    <div className="top-nav">
                        <button style={{"marginRight": "0.5rem"}} className="run-btn btn-edited ar-session-btn">
                            <img src={runIcon} alt="" />
                        </button>
                        <Popup trigger={<button className="frequency-btn ar-session-btn btn-edited"><p>Hz</p></button>} modal>
                            <form className="box-modal" onSubmit={handleSumbit}>
                                <div className="input-menu">
                                    <label htmlFor="indikator">Indikator: </label>
                                    <select name="indikator" id="indikator" onChange={handleRadio}>
                                        <option value="frekuensi">frekuensi</option>
                                        <option value="resistor">Resistor</option>
                                        {
                                            labList.length !== 0 ?
                                            labList.map(lab => (
                                                lab.title.toUpperCase().includes('RL') ? 
                                                <option value="induktor">Induktor</option> : 
                                                <option value="kapasitor">Kapasitor</option>
                                            )) : <></>
                                        }
                                    </select>
                                </div>
                                <section className='input-frequency'>
                                    <input 
                                        type="number" 
                                        step="any"
                                        style={{"display": "block"}}
                                        className='input-freq-form input-text input-freq'
                                        placeholder='Frekuensi (Hz)'
                                        onChange={(e) => indikatorValue.frequencyValue = e.target.value}
                                    />
                                    <input 
                                        type="number"
                                        step="any"
                                        style={{"display": "none"}}
                                        className='input-freq-form input-text input-kapasitor'
                                        placeholder='Kapasitor (F)'
                                        onChange={(e) => indikatorValue.kapasitorValue = e.target.value}
                                    />
                                    <input 
                                        type="number" 
                                        step="any"
                                        style={{"display": "none"}}
                                        className='input-freq-form input-text input-resistor'
                                        placeholder='Resistor (Ohm)'
                                        onChange={(e) => indikatorValue.resistorValue = e.target.value}
                                    />
                                    <button className='change-freq-btn'>Ubah</button>
                                </section>
                                <section className="keterangan"></section>
                            </form>
                        </Popup>                        
                    </div>
                    <div className="bottom-nav">
                        <button className='rotate-btn rotate-left btn-edited ar-session-btn'>
                            <img src={rotateLeftIcon} alt="rotate left" />
                        </button>
                        <button className='place-btn btn-edited ar-session-btn'>
                            <img src={placeAR} alt="place" />
                        </button>
                        <button className='rotate-btn rotate-right btn-edited ar-session-btn'>
                            <img src={rotateRightIcon} alt="rotate right" />
                        </button>
                    </div>
                </div>

                {/* close btn */}
                <button className='close-btn btn-edited ar-session-btn'>
                    <img src={closeIcon} alt="close" />
                </button>

                {/* box model for error and input frequency */}
                <div className="box-modal-container">                    
                    <div className="box-modal error-no-model">
                        <h3>Error!!</h3>
                        <p>Pilih Objek yang mau diletakkan terlebih dahulu!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ARPages;