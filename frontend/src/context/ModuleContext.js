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
        image: ''
    })

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
        // console.log(data)
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
    const addTheory = (moduleId) => {
        // http://localhost:8000/api/module/:moduleId/create-theory
        axios.patch(`http://localhost:8000/api/module/${moduleId}/create-theory`, {
            theoryNumber: theory.theoryNumber,
            title: theory.title,
            description: theory.description,
            image: theory.image
        },{headers: {"Authorization" : `Bearer ${token}`}})
        .catch(err => console.log(err))
        // setTheoryList([...theoryList, theory])
        setTheoryNum(theoryNum + 1)
    }
    
    const handleChangeTheory = (e) => {
        setTheory({
            ...theory, 
            theoryNumber: theoryNum,
            [e.target.name]: e.target.value
        })
    }

    const deleteTheory = (num) => {
        
        setTheoryList(theoryList.filter(theory => theory.theoryNumber !== Number(num)));
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
                deleteLab
            }}>
            {children}
        </ModuleContext.Provider>
    )
}