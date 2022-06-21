import { createContext, useState } from "react";

export const ModuleContext = createContext();

export const ModuleContextProvider = ({ children }) => {
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

    const addModule = (e) => {
        e.preventDefault()
        setModuleList([...moduleList, module])
        setModuleNum(moduleNum + 1)
    }

    const deleteModule = (num) => setModuleList(moduleList.filter(module => module.moduleNumber !== Number(num)));

    // Theory CRUD
    const addTheory = () => {
        setTheoryList([...theoryList, theory])
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
                moduleList,
                handleChangeModule,
                deleteModule,
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