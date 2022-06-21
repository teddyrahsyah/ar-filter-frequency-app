import '../../style/App.css';
import Popup from 'reactjs-popup';

import { useContext, useEffect } from 'react';
import { ARContext } from '../../context/ARContext';
import { PreviewObject } from '../../context/PreviewObject';

// import icon
import backIcon from '../../asset/icons/back.svg'
import closeIcon from '../../asset/icons/close.svg'
import menuAR from '../../asset/icons/menu_ar.svg'
import placeAR from '../../asset/icons/place.svg'
import rotateLeftIcon from '../../asset/icons/rotate_right.svg'
import rotateRightIcon from '../../asset/icons/rotate_left.svg'
import runIcon from '../../asset/icons/run.svg'
import frequencyIcon from '../../asset/icons/frequency.svg'

// import image
import logo from '../../asset/logoDark.png'
import keyboardImg from '../../asset/keyboard.png'
import MouseImg from '../../asset/Mouse.jpg'
import PCImg from '../../asset/pc.jpg'
import LCDImg from '../../asset/Monitor.jpg'
import { OutputWaveContext } from '../../context/OutputWaveContext';
import useCapture from '../../hooks/useCapture';

const ARPages = () => {
    const {activateAR} = useContext(ARContext)
    const {showObject} = useContext(PreviewObject)
    const {waveGenerator} = useContext(OutputWaveContext)
    const { capture } = useCapture()

    useEffect(() => {
        showObject();
        waveGenerator()
    })
    setTimeout(() => {
        capture()
    },[2000])

    const openMenu = () => {
        document.querySelector('.model-nav').classList.toggle('nav-opened-menu')
        document.querySelector('.open-btn').classList.toggle('widgets-open')
        document.querySelector('.place-btn').classList.toggle('widgets-open')
        document.querySelector('.run-btn').classList.toggle('widgets-open')
        document.querySelector('.frequency-btn').classList.toggle('widgets-open')
        document.querySelectorAll('.rotate-btn').forEach(rotate => rotate.classList.toggle('widgets-open'))
    }
    // document.querySelector('.change-freq-btn').addEventListener('click', () => {
    //     console.log('test')
    // })

    const Modal = () => (
        <Popup trigger={<button className="frequency-btn btn"><img src={frequencyIcon} alt="Frequency" /></button>} modal>
            <form className="box-modal input-frequency">
                <input type="text" className='input-freq-form input-text'placeholder='Frekuensi (Hz)' />
                <span className='change-freq-btn' onClick={() => console.log('test')}>Ganti Frekuensi</span>
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
                    <p>
                        eits.. sebelum kamu mencoba rangkaian di pada lab AR pastikan kamu sudah membaca panduan penggunaan AR nya terlebih dahulu ya
                    </p>
                    <div className="card-panduan-ar">
                        <div className="gambar-panduan">
                            <img src={logo} alt="logo filter frequency ar simulator" />
                        </div>
                        <h3>Panduan Penggunaan <br /> AR Simulator</h3>
                    </div>
                    <div className="show-object">
                        <h3>Object yang akan digunakan pada lab kali ini</h3>
                        <div className="object-image-list">
                            <img src={keyboardImg} alt="Frekuensi generator" />
                            <img src={keyboardImg} alt="Rangkaian HPF" />
                            <img src={keyboardImg} alt="Osilator" />
                        </div>
                        <div className="canvas-container"></div>
                    </div>
                    <button onClick={activateAR} className='ar-btn btn'>Start AR</button>
                </div>
            </div>
            <div className="output-container">
                <div className="output-wave"></div>
            </div>

            {/* inside AR session */}
            <div className="widgets">
                {/* Navigation */}
                <div className="top-nav">
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
                <div className="bottom-nav">
                    <button className="open-btn btn" onClick={openMenu}>
                        <img src={menuAR} alt="" />
                    </button>
                    {/* <button className='frequency-btn btn'>
                        <img src={frequencyIcon} alt="Frequency" />
                    </button> */}
                    <Modal />
                    <button className='run-btn btn'>
                        <img src={runIcon} alt="Run" />
                    </button>
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
                <ul className="model-nav">
                    <li className='ar-object' id='Keyboard'>
                        <img src={keyboardImg} alt="keyboard" />
                        <p>Keyboard</p>
                    </li>
                    <li className='ar-object' id='Mouse'>
                        <img src={MouseImg} alt="mouse" />
                        <p>Mouse</p>
                    </li>
                    <li className='ar-object' id='PC'>
                        <img src={PCImg} alt="PC" />
                        <p>PC</p>
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