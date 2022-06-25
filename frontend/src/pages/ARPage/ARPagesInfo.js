import '../../style/App.css';
import Popup from 'reactjs-popup';

import { useContext, useEffect } from 'react';
import { ARContext } from '../../context/ARContext';
import { PreviewObject } from '../../context/PreviewObject';

// import icon
import backIcon from '../../asset/icons/back.svg'
import closeIcon from '../../asset/icons/close.svg'
import rightIcon from '../../asset/icons/right.svg'
import placeAR from '../../asset/icons/place.svg'
import rotateLeftIcon from '../../asset/icons/rotate_right.svg'
import rotateRightIcon from '../../asset/icons/rotate_left.svg'
import runIcon from '../../asset/icons/run.svg'
import frequencyIcon from '../../asset/icons/wave.svg'
import osiloskopIcon from '../../asset/icons/osiloskop.svg'

// import image
import keyboardImg from '../../asset/keyboard.png'
import frequencyGeneratorImg from '../../asset/frekuensi_generator.png'
import LPFRCImg from '../../asset/LPF_RC.png'
import LCDImg from '../../asset/Monitor.jpg'
import { OutputWaveContext } from '../../context/OutputWaveContext';
import useCapture from '../../hooks/useCapture';

const ARPages = () => {
    const {activateAR} = useContext(ARContext)
    const {showObject} = useContext(PreviewObject)
    const {draw, handleInput} = useContext(OutputWaveContext)
    const { capture } = useCapture()

    useEffect(() => {
        showObject();
    })
    

    const drawAndCapture = () => {
        draw()
        setTimeout(() => {
            capture()
        },[500])
    }

    const openMenu = () => {
        document.querySelector('.model-nav').classList.toggle('nav-opened-menu')
        document.querySelector('.model-nav-btn').classList.toggle('nav-opened-btn')
    }

    const Modal = () => (
        <Popup trigger={<button className="frequency-btn btn"><img src={frequencyIcon} alt="Frequency" /></button>} modal>
            <form className="box-modal">
                <div className="input-menu">
                    <label htmlFor="indikator">Indikator: </label>
                    <select name="indikator" id="indikator">
                        <option value="resistor">Resistor</option>
                        <option value="kapasitor">kapasitor</option>
                        <option value="frekuensi">frekuensi</option>
                    </select>
                </div>
                <section className='input-frequency'>
                    <input type="text" className='input-freq-form input-text'placeholder='Frekuensi (Hz)' onChange={handleInput} />
                    <span className='change-freq-btn' onClick={drawAndCapture}>Ubah</span>
                </section>
            </form>
        </Popup>
    );

    return (
        <div>
            <div className="ar-container">
                <nav className="ar-navbar">
                    <div className="back-btn">
                        <img src={backIcon} alt="kembali" />
                    </div>
                    <p>Filter Frequency AR Simulator</p>
                    <div></div>
                </nav>
                <div className="ar-content">
                    <h1>high pass filter</h1>
                    <div className="show-object">
                        <h3>Object yang akan digunakan pada lab kali ini</h3>
                        <div className="object-image-list">
                            <img src={frequencyGeneratorImg} alt="Frekuensi generator" />
                            <img src={LPFRCImg} alt="Rangkaian HPF" />
                            <img src={keyboardImg} alt="Osilator" />
                        </div>
                        <div className="canvas-container"></div>
                    </div>
                    <button onClick={activateAR} className='ar-btn btn'>Start AR</button>
                </div>
            </div>
            <div className="output-container">
                <div className="output-wave"><canvas id="canvas"></canvas></div>
            </div>

            {/* inside AR session */}
            <div className="widgets">
                {/* Navigation */}
                <div className="navigation">

                    <div className="top-nav">
                        <button className="run-btn btn">
                            <img src={runIcon} alt="" />
                        </button>
                        <Modal />
                        <button className='open-btn btn'>
                            <img src={osiloskopIcon} alt="Run" />
                        </button>
                        
                    </div>
                    <div className="bottom-nav">
                        <button className='rotate-btn rotate-left btn'>
                            <img src={rotateLeftIcon} alt="rotate left" />
                        </button>
                        <button className='place-btn btn'>
                            <img src={placeAR} alt="place" />
                        </button>
                        <button className='rotate-btn rotate-right btn'>
                            <img src={rotateRightIcon} alt="rotate right" />
                        </button>
                    </div>
                </div>

                {/* close btn */}
                <button className='close-btn btn'>
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
                    <button className="open-btn btn" onClick={openMenu}>
                        <img src={rightIcon} alt="" />
                    </button>
                </div>
                <ul className="model-nav">
                    <li className='ar-object' id='Keyboard'>
                        <img src={frequencyGeneratorImg} alt="keyboard" />
                        <p>Frekuensi Generator</p>
                    </li>
                    <li className='ar-object' id='Mouse'>
                        <img src={LPFRCImg} alt="mouse" />
                        <p>Rangkaian Filter</p>
                    </li>
                    <li className='ar-object' id='Monitor'>
                        <img src={LCDImg} alt="LCD Monitor" />
                        <p>LCD Monitor</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}
 
export default ARPages;