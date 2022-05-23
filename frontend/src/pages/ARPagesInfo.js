import { useContext } from 'react';
import '../style/App.css';
import { ARContext } from '../context/ARContext';
import { OutputWaveContext } from '../context/OutputWaveContext';
import keyboardImg from '../asset/keyboard.png'
import MouseImg from '../asset/Mouse.jpg'
import PCImg from '../asset/pc.jpg'
import LCDImg from '../asset/Monitor.jpg'

const ARPages = () => {
    const {activateAR} = useContext(ARContext)
    const {waveGenerator} = useContext(OutputWaveContext)

    const openMenu = () => {
        document.querySelector('.model-nav').classList.toggle('nav-opened-menu')
        document.querySelector('.open-btn').classList.toggle('btn-opened-menu')
        document.querySelector('.place-btn').classList.toggle('widgets-open')
    }

    return ( 
        <div>
            <div className="App">
                <h1>Hello AR</h1>
                <button onClick={activateAR}>start ar</button>
            </div>
            <div className="widgets">
                <button className='place-btn btn'>PLACE</button>
                {/* <button className="rotate-btn btn">ROTATE</button> */}
                <button className='close-btn btn'>close</button>
                <div className='menu-btn'>
                    <button className="open-btn" onClick={openMenu}>MENU</button> 
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
        </div>
    );
}
 
export default ARPages;