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
import osiloskopIcon from '../../asset/icons/osiloskop.svg'

// import image
import frequencyGeneratorImg from '../../asset/frequency_generator.png'
import osiloskopImage from '../../asset/osiloskop.jpg'

const ARPages = () => {
    let labTitle;
    const {modulId, labId} = useParams()
    const {activateAR} = useContext(ARContext)
    const {showObject} = useContext(PreviewObject)
    const { captureOutput, capturefrequency } = useCapture()
    const {labList} = useContext(ModuleContext)
    
    const [indikatorValue, setIndikatorValue] = useState({
        frequencyValue:10000,
        resistorValue: 1000,
        kapasitorValue: 0.00000001,
        induktorValue: 0.47
    })
    const [osiloskopValue, setOsiloskopValue] = useState({
        vppValue:1,
        phaseValue: 0,
        tMaxValue: 0.001
    })
    
    if(labList.length !== 0) labList.map((lab) => { if(lab.labId === labId) labTitle = lab.title;})
    const {checkLab} = useFetchAR(modulId, labTitle, indikatorValue, osiloskopValue)
    

    const handleRadio = (e) => {
        if(e.target.value === 'frekuensi') {
            document.querySelector('.input-freq').style.display = 'block'
            document.querySelector('.input-kapasitor').style.display = 'none'
            document.querySelector('.input-resistor').style.display = 'none'
            document.querySelector('.input-induktor').style.display = 'none'
        }
        else if(e.target.value === 'kapasitor') {
            document.querySelector('.input-kapasitor').style.display = 'block'
            document.querySelector('.input-freq').style.display = 'none'
            document.querySelector('.input-resistor').style.display = 'none'
            document.querySelector('.input-induktor').style.display = 'none'
        }
        else if(e.target.value === 'resistor') {
            document.querySelector('.input-resistor').style.display = 'block'
            document.querySelector('.input-freq').style.display = 'none'
            document.querySelector('.input-kapasitor').style.display = 'none'
            document.querySelector('.input-induktor').style.display = 'none'
        }
        else if(e.target.value === 'induktor') {
            document.querySelector('.input-resistor').style.display = 'none'
            document.querySelector('.input-freq').style.display = 'none'
            document.querySelector('.input-kapasitor').style.display = 'none'
            document.querySelector('.input-induktor').style.display = 'block'
        }
        else if(e.target.value === 'vpp') {
            document.querySelector('.input-vpp').style.display = 'block'
            document.querySelector('.input-phase').style.display = 'none'
            document.querySelector('.input-tmax').style.display = 'none'
        }
        else if(e.target.value === 'phase') {
            document.querySelector('.input-phase').style.display = 'block'
            document.querySelector('.input-vpp').style.display = 'none'
            document.querySelector('.input-tmax').style.display = 'none'
        }
        else if(e.target.value === 'tmax') {
            document.querySelector('.input-tmax').style.display = 'block'
            document.querySelector('.input-phase').style.display = 'none'
            document.querySelector('.input-vpp').style.display = 'none'
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
        }, [500] )
    }

    const handleSumbit = e => {
        e.preventDefault()
        drawAndCapture()
        setIndikatorValue({
            frequencyValue: indikatorValue.frequencyValue,
            resistorValue: indikatorValue.resistorValue,
            kapasitorValue: indikatorValue.kapasitorValue,
            induktorValue: indikatorValue.induktorValue
        })
        setOsiloskopValue({
            vppValue: osiloskopValue.vppValue,
            phaseValue: osiloskopValue.phaseValue,
            tMaxValue: osiloskopValue.tMaxValue,
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
                                    <input 
                                        type="number"
                                        step="any"
                                        style={{"display": "none"}}
                                        className='input-freq-form input-text input-kapasitor'
                                        placeholder={'Kapasitor (F)'}
                                        onChange={(e) => indikatorValue.kapasitorValue = e.target.value}
                                    />
                                    <input 
                                        type="number"
                                        step="any"
                                        style={{"display": "none"}}
                                        className='input-freq-form input-text input-induktor'
                                        placeholder={'Induktor (H)'}
                                        onChange={(e) => indikatorValue.induktorValue = e.target.value}
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
                        <Popup trigger={<button style={{"marginLeft": "0.5rem"}} className="run-btn ar-session-btn btn-edited"><img src={osiloskopIcon} alt="" /></button>} modal>
                            <form className="box-modal" onSubmit={handleSumbit}>
                                <div className="input-menu">
                                    <label htmlFor="indikator">Indikator: </label>
                                    <select name="indikator" id="indikator" onChange={handleRadio}>
                                        <option value="vpp">VPP</option>
                                        <option value="phase">Fase</option>
                                        <option value="tmax">T Max</option>
                                    </select>
                                </div>
                                <section className='input-frequency'>
                                    <input 
                                        type="number" 
                                        step="any"
                                        style={{"display": "block"}}
                                        className='input-freq-form input-text input-vpp'
                                        placeholder='VPP (V)'
                                        onChange={(e) => osiloskopValue.vppValue = e.target.value}
                                    />
                                    <input 
                                        type="number"
                                        step="any"
                                        style={{"display": "none"}}
                                        className='input-freq-form input-text input-phase'
                                        placeholder='Fase (deg)'
                                        onChange={(e) => osiloskopValue.phaseValue = e.target.value}
                                    />
                                    <input 
                                        type="number"
                                        step="any"
                                        style={{"display": "none"}}
                                        className='input-freq-form input-text input-tmax'
                                        placeholder='T Max (s)'
                                        onChange={(e) => osiloskopValue.tMaxValue = e.target.value}
                                    />
                                    <button className='change-freq-btn'>Ubah</button>
                                </section>
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