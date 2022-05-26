import { useContext } from 'react';
import '../style/App.css';
import { ARContext } from '../context/ARContext';
import { OutputWaveContext } from '../context/OutputWaveContext';

// import icon
import backIcon from '../asset/icons/back.svg'
import closeIcon from '../asset/icons/close.svg'
import menuAR from '../asset/icons/menu_ar.svg'
import placeAR from '../asset/icons/place.svg'
import rotateRightIcon from '../asset/icons/rotate_right.svg'
import rotateLeftIcon from '../asset/icons/rotate_left.svg'

// import image
import logo from '../asset/logoDark.png'
import keyboardImg from '../asset/keyboard.png'
import MouseImg from '../asset/Mouse.jpg'
import PCImg from '../asset/pc.jpg'
import LCDImg from '../asset/Monitor.jpg'


const ARPages = () => {
    const {activateAR} = useContext(ARContext)
    const {waveGenerator} = useContext(OutputWaveContext)

    const openMenu = () => {
        document.querySelector('.model-nav').classList.toggle('nav-opened-menu')
        document.querySelector('.open-btn').classList.toggle('widgets-open')
        document.querySelector('.place-btn').classList.toggle('widgets-open')
        document.querySelectorAll('.rotate-btn').forEach(rotate => rotate.classList.toggle('widgets-open'))
    }

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
                    </div>
                    <button onClick={activateAR} className='ar-btn btn'>Start AR</button>
                </div>
            </div>

            <div className="error-big-screen">
                <h1>hanya support di HP</h1>
            </div>

            {/* inside AR session */}
            <div className="widgets">
                {/* <button className="rotate-btn btn">ROTATE</button> */}
                <button className='close-btn btn'>
                    <img src={closeIcon} alt="close" />
                </button>
                <button className="open-btn btn" onClick={openMenu}>
                    <img src={menuAR} alt="" />
                </button>
                <button className='place-btn btn'>
                    <img src={placeAR} alt="place" />
                </button>
                <button className='rotate-btn btn'>
                    <img src={rotateRightIcon} alt="rotate right" />
                </button>
                <button className='rotate-btn btn'>
                    <img src={rotateLeftIcon} alt="rotate left" />
                </button>
                
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