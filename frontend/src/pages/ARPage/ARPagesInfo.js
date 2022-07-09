import '../../style/App.css';
import Popup from 'reactjs-popup';

import { useContext, useEffect, useState } from 'react';
import { ARContext } from '../../context/ARContext';
import { PreviewObject } from '../../context/PreviewObject';
import { ModuleContext } from '../../context/ModuleContext';
import { useParams } from 'react-router-dom';
import useCapture from '../../hooks/useCapture';
import useFetchAR from '../../hooks/useFetchAR';
import parse from 'html-react-parser';

// import icon
import closeIcon from '../../asset/icons/close.svg'
import placeAR from '../../asset/icons/place.svg'
import rotateLeftIcon from '../../asset/icons/rotate_right.svg'
import rotateRightIcon from '../../asset/icons/rotate_left.svg'
import runIcon from '../../asset/icons/run.svg'

const ARPages = () => {
    let labTitle;
    const {modulId, labId} = useParams()
    const {activateAR} = useContext(ARContext)
    const {showObject} = useContext(PreviewObject)
    const { captureOutput, capturefrequency, captureResponse } = useCapture()
    const {labList} = useContext(ModuleContext)
    
    const [indikatorValue, setIndikatorValue] = useState({
        frequencyValue:10000,
        resistorValue: 1000,
        kapasitorValue: 0.0000006,
        induktorValue: 0.47,
        resistorTwoValue: 600,
        kapasitorTwoValue: 0.0000001,
    })
    
    if(labList.length !== 0) labList.map((lab) => { if(lab.labId === labId) labTitle = lab.title;})
    const {checkLab} = useFetchAR(modulId, labTitle, indikatorValue)
    

    const handleRadio = (e) => {
        if(e.target.value === 'frekuensi') {
            document.querySelector('.input-freq').style.display = 'block'
            document.querySelectorAll('.input-kapasitor').forEach(el => el.style.display = 'none')
            document.querySelectorAll('.input-resistor').forEach(el => el.style.display = 'none')
            document.querySelector('.input-induktor').style.display = 'none'
        }
        else if(e.target.value === 'kapasitor') {
            document.querySelectorAll('.input-kapasitor').forEach(el => el.style.display = 'block')
            document.querySelector('.input-freq').style.display = 'none'
            document.querySelectorAll('.input-resistor').forEach(el => el.style.display = 'none')
            document.querySelector('.input-induktor').style.display = 'none'
        }
        else if(e.target.value === 'resistor') {
            document.querySelectorAll('.input-resistor').forEach(el => el.style.display = 'block')
            document.querySelector('.input-freq').style.display = 'none'
            document.querySelectorAll('.input-kapasitor').forEach(el => el.style.display = 'none')
            document.querySelector('.input-induktor').style.display = 'none'
        }
        else if(e.target.value === 'induktor') {
            document.querySelectorAll('.input-resistor').forEach(el => el.style.display = 'none')
            document.querySelector('.input-freq').style.display = 'none'
            document.querySelectorAll('.input-kapasitor').forEach(el => el.style.display = 'none')
            document.querySelector('.input-induktor').style.display = 'block'
        }
    }

    useEffect(() => {
        drawAndCapture()
        if(labList.length !== 0) labList.map(lab => {
            if(lab.labId === labId) showObject(lab.modelAR)
        })
    })

    const drawAndCapture = () => {
        checkLab()
        setTimeout(() => { 
            captureOutput()
            capturefrequency()
            captureResponse()
        }, [500] )
    }

    const handleSumbit = e => {
        e.preventDefault()
        drawAndCapture()
        setIndikatorValue({
            frequencyValue: indikatorValue.frequencyValue,
            resistorValue: indikatorValue.resistorValue,
            kapasitorValue: indikatorValue.kapasitorValue,
            induktorValue: indikatorValue.induktorValue,
            resistorTwoValue: indikatorValue.resistorTwoValue,
            kapasitorTwoValue: indikatorValue.kapasitorTwoValue,
        })
        document.querySelector('.keterangan').innerHTML= `Parameter berhasil diubah!`
    }

    return (
        <div>
            <div className="ar-container">
            {
                labList.length !== 0 ?
                labList.map(lab => lab.labId === labId ? (
                    <div className="ar-content">
                        <h1>{lab.title}</h1>
                        <section className="lab-description">
                            {parse(lab.description)}
                        </section>
                        <div className="show-object">
                            <h2>susunan rangkaian pada lab ini</h2>
                            <div className="canvas-container"></div>
                        </div>
                        <button onClick={() => activateAR(lab.modelAR)} className='ar-btn btn-edited'>Start AR</button>
                        <div id="stabilization"></div>
                    </div>
                ) : <></>)
                : <div>Loading...</div>
            }
            </div>
            <div className="output-container">
                <div className="output-wave"><canvas id="canvas"></canvas></div>
                <div className="output-response"><canvas id="canvasResponse"></canvas></div>
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
                                            labList.map(lab => lab.labId === labId ? (
                                                lab.title.toUpperCase().includes('RL') ? 
                                                <option value="induktor">Induktor</option> : 
                                                <option value="kapasitor">Kapasitor</option>
                                            ) : <></>) : <></>
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
                                    {
                                        labList.length !== 0? 
                                        labList.map(lab => lab.labId === labId ?
                                            lab.title.toUpperCase().includes('BAND PASS') ?
                                            <>  
                                                <input type="number" step="any" style={{"display": "none"}} className='input-freq-form input-text input-kapasitor' placeholder={'Kapasitor 1 (F)'}onChange={(e) => indikatorValue.kapasitorValue = e.target.value}/>
                                                <input type="number" step="any" style={{"display": "none"}} className='input-freq-form input-text input-kapasitor' placeholder={'Kapasitor 2 (F)'} onChange={(e) => indikatorValue.kapasitorValue = e.target.value}/>
                                                <input type="number" step="any" style={{"display": "none"}} className='input-freq-form input-text input-resistor' placeholder='Resistor 1 (Ohm)' onChange={(e) => indikatorValue.resistorValue = e.target.value} />
                                                <input type="number" step="any" style={{"display": "none"}} className='input-freq-form input-text input-resistor' placeholder='Resistor 2 (Ohm)' onChange={(e) => indikatorValue.resistorValue = e.target.value} />
                                            </> : 
                                            <>
                                                <input type="number" step="any" style={{"display": "none"}} className='input-freq-form input-text input-kapasitor' placeholder={'Kapasitor (F)'} onChange={(e) => indikatorValue.kapasitorValue = e.target.value} />
                                                <input type="number" step="any" style={{"display": "none"}} className='input-freq-form input-text input-resistor' placeholder='Resistor (Ohm)' onChange={(e) => indikatorValue.resistorValue = e.target.value} />
                                            </>
                                            : <></>)
                                        : <></>
                                    }
                                    <input 
                                        type="number"
                                        step="any"
                                        style={{"display": "none"}}
                                        className='input-freq-form input-text input-induktor'
                                        placeholder={'Induktor (H)'}
                                        onChange={(e) => indikatorValue.induktorValue = e.target.value}
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
            </div>
        </div>
    );
}
 
export default ARPages;