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
import osiloskopIcon from '../../asset/icons/osiloskop.svg'
import frequencyIcon from '../../asset/icons/wave.svg'

// import image
import frequencyGeneratorImg from '../../asset/frequency_generator.png'
import LPFRCImg from '../../asset/LPF_RC.png'
import osiloskopImage from '../../asset/osiloskop.jpg'

const ARPages = () => {
    const {activateAR} = useContext(ARContext)
    const {showObject} = useContext(PreviewObject)
    const { captureOutput, capturefrequency } = useCapture()
    const {LPFRCFormula} = useFormula()
    
    const [indikatorValue, setIndikatorValue] = useState({
        frequencyValue:10000,
        resistorValue: 1000,
        kapasitorValue: 0.00000001,
        induktorValue: 0.47
    })

    const handleRadio = (e) => {
        if(e.target.value === 'frekuensi') {
            document.querySelector('.input-freq').style.display = 'block'
            document.querySelector('.input-resistor').style.display = 'none'
            document.querySelector('.input-kapasitor').style.display = 'none'
        }
        else if(e.target.value === 'kapasitor') {
            document.querySelector('.input-freq').style.display = 'none'
            document.querySelector('.input-resistor').style.display = 'none'
            document.querySelector('.input-kapasitor').style.display = 'block'
        }
        else if(e.target.value === 'resistor') {
            document.querySelector('.input-freq').style.display = 'none'
            document.querySelector('.input-resistor').style.display = 'block'
            document.querySelector('.input-kapasitor').style.display = 'none'
        }
    }

    const drawAndCapture = () => {
        LPFRCFormula (parseFloat(indikatorValue.frequencyValue), parseFloat(indikatorValue.resistorValue), parseFloat(indikatorValue.kapasitorValue))
        setTimeout(() => { 
            captureOutput()
            capturefrequency()
        }, [500] )
    }
    useEffect(() => {
        drawAndCapture()
        showObject()
    }, [])

    const handleSumbit = e => {
        e.preventDefault()
        drawAndCapture()
        setIndikatorValue({
            frequencyValue: indikatorValue.frequencyValue,
            resistorValue: indikatorValue.resistorValue,
            kapasitorValue: indikatorValue.kapasitorValue
        })
    }

    const openMenu = () => {
        document.querySelector('.model-nav').classList.toggle('nav-opened-menu')
        document.querySelector('.model-nav-btn').classList.toggle('nav-opened-btn')
    }

    return (
        <div>
            <div className="ar-container">
                <div className="ar-content">
                    <h1>high pass filter</h1>
                    <div className="show-object">
                        <h3>Object yang akan digunakan pada lab kali ini</h3>
                        <div className="object-image-list">
                            <img id='frequencyGeneratorModel' className='object-list' src={frequencyGeneratorImg} alt="Frekuensi generator" />
                            <img id='LPFRCModel' className='object-list' src={LPFRCImg} alt="Rangkaian HPF" />
                            <img id='osiloskop' className='object-list' src={osiloskopImage} alt="Osilator" />
                        </div>
                        <div className="canvas-container"></div>
                    </div>
                    <button onClick={activateAR} className='ar-btn btn-edited'>Start AR</button>
                </div>
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
                        <button className="run-btn btn-edited ar-session-btn">
                            <img src={runIcon} alt="" />
                        </button>
                        <Popup trigger={<button className="frequency-btn ar-session-btn btn-edited"><img src={frequencyIcon} alt="Frequency" /></button>} modal>
                            <form className="box-modal" onSubmit={handleSumbit}>
                                <div className="input-menu">
                                    <label htmlFor="indikator">Indikator: </label>
                                    <select name="indikator" id="indikator" onChange={handleRadio}>
                                        <option value="frekuensi">frekuensi</option>
                                        <option value="kapasitor">kapasitor</option>
                                        <option value="resistor">Resistor</option>
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
                            </form>
                        </Popup>
                        <button className='open-btn btn-edited ar-session-btn'>
                            <img src={osiloskopIcon} alt="Run" />
                        </button>
                        
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
                
                {/* image for menu */}
                <div className="model-nav-btn">
                    <button className="open-btn btn-edited ar-session-btn" onClick={openMenu}>
                        <img src={rightIcon} alt="" />
                    </button>
                </div>
                <ul className="model-nav">
                    <li className='ar-object' id='frequencyGenerator'>
                        <img src={frequencyGeneratorImg} alt="frequency generator" />
                        <p>Frekuensi Generator</p>
                    </li>
                    <li className='ar-object' id='filter'>
                        <img src={LPFRCImg} alt="filter" />
                        <p>Rangkaian Filter</p>
                    </li>
                    <li className='ar-object' id='osiloskop'>
                        <img src={osiloskopImage} alt="osiloskop" />
                        <p>LCD Monitor</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}
 
export default ARPages;