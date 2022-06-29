import { createContext, useState } from "react";
import axios from 'axios'
import Cookies from "js-cookie"

export const ModuleContext = createContext();

export const ModuleContextProvider = ({ children }) => {
    
    const token = Cookies.get('token')

    // Module State
    const [moduleNum, setModuleNum] = useState(1)
    const [module, setModule] = useState({
        moduleNumber: moduleNum,
        moduleTitle: '',
    })
    const [moduleList, setModuleList] = useState([])

    // Theory State
    const [ theoryNum, setTheoryNum ] = useState(1)
    const [ theoryList, setTheoryList ] = useState([])
    const [ theory, setTheory ] = useState({
        theoryNumber: theoryNum,
        title: '',
        description: '',
    })
    const [imageTheory, setImageTheory] = useState(null)

    // Lab State
    const [ labNum, setLabNum ] = useState(1)
    const [ labList, setLabList ] = useState([])
    const [ lab, setLab ] = useState({
        labNumber: labNum,
        title: '',
        description: '',
        thumbnailAR: '',
        modelAR:''
    })

    // Checking moduleNumber
    const checkModuleNumber = () => {
        moduleList.map(modul => {
            if(moduleNum !== modul.moduleNumber) setModuleNum(modul.moduleNumber +1)
        })
    }
    
    const checkTheoryNumber = () => {
        theoryList.map(theory => {
            if(theoryNum !== theory.theoryNumber) setTheoryNum(theory.theoryNumber +1)
        })
    }
    
    // Module CRUD
    const handleChangeModule = (e) => {
        setModule({
            ...module, 
            moduleNumber: moduleNum,
            [e.target.name]: e.target.value
        })
    }

    const getModule = async () => {
        const result = await axios.get('http://localhost:8000/api/module')
        const data = result.data.results
        console.log(data)
        setModuleList(data.map(modul => {
            return {
                moduleNumber: modul.moduleNumber,
                moduleTitle: modul.moduleTitle,
                modulId: modul.id,
            }
        }))
    }

    const getDetailModule = (modulId) => {
        axios.get(`http://localhost:8000/api/module/${modulId}`, {headers: {"Authorization" : "Bearer "+ token}})
        .then(res => {
            const dataModul = res.data.results
            setModule(dataModul)
            console.log(dataModul.theory)
            setTheoryList(dataModul.theory.map(materi => {
                return {
                    theoryNumber: materi.theoryNumber,
                    title: materi.title,
                    description: materi.description,
                    image: materi.image,
                    theoryId: materi._id,
                    moduleNumber: materi.moduleNumber,
                    moduleTitle: materi.modulTitle,
                    moduleId: materi.moduleId,

                }
            }))
        })
    }

    const addModule = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/module/create', {
            moduleNumber: module.moduleNumber,
            title: module.moduleTitle,
        }, {headers: {"Authorization" : `Bearer ${token}`}})
        .catch(err => console.log(err))
        setModuleNum(moduleNum + 1)
        console.log(module)

        module.moduleTitle = ''
    }

    const deleteModule = (moduleId) => {
        axios.delete(`http://localhost:8000/api/module/${moduleId}`, 
        {headers: {"Authorization" : `Bearer ${token}`}})
        .catch(err => console.log(err))
    }

    // Theory CRUD
    
    const handleChangeTheory = (e) => {
        setTheory({
            ...theory, 
            theoryNumber: theoryNum,
            [e.target.name]: e.target.value
        })
    }
    
    const handleImage = (e) => setImageTheory(e.target.files[0])

    const addTheory = (moduleId, modulNumber, modulTitle) => {
        // http://localhost:8000/api/module/:moduleId/create-theory
        const data = new FormData()
        data.append("theoryNumber", theory.theoryNumber)
        data.append("title", theory.title)
        data.append("description", theory.description)
        data.append("moduleNumber", modulNumber)
        data.append("moduleTitle", modulTitle)
        data.append(
            "image",
            imageTheory,
            imageTheory.name
        )
        axios.patch(`http://localhost:8000/api/module/${moduleId}/create-theory`, data,
        {headers: {"Authorization" : `Bearer ${token}`}})
        .catch(err => console.log(err))
        setTheoryNum(theoryNum + 1)
    }

    const deleteTheory = (moduleId, theoryId) => {
        // api/module/:id/:theoryId/delete-theory
        axios.patch(`http://localhost:8000/api/module/${moduleId}/${theoryId}/delete-theory`, 
        {headers: {"Authorization" : `Bearer ${token}`}})
        .catch(err => console.log(err))
        // console.log(token)
    }

    // Lab CRUD
    const addLab = () => {
        setLabList([...labList, lab])
        setLabNum(labNum + 1)
    }
    
    const handleChangeLab = (e) => {
        setLab({
            ...lab, 
            labNumber: labNum,
            [e.target.name]: e.target.value
        })
    }

    const deleteLab = (num) => setLabList(labList.filter(lab => lab.labNumber !== Number(num)));

    return (
        <ModuleContext.Provider value={{
                module, 
                setModule, 
                addModule,
                getModule,
                moduleList,
                handleChangeModule,
                deleteModule,
                getDetailModule,
                theoryList,
                theory,
                addTheory,
                handleChangeTheory,
                deleteTheory,
                labList,
                addLab,
                handleChangeLab,
                deleteLab,
                handleImage,
                checkModuleNumber,
                checkTheoryNumber
            }}>
            {children}
        </ModuleContext.Provider>
    )
}