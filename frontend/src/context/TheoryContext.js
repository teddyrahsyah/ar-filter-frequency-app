import axios from "axios";
import { createContext, useState } from "react";

export const TheoryContext = createContext()

export const TheoryContextProvider = ({ children }) => {
    const [ theoryNum, setTheoryNum ] = useState(1)
    const [ theoryData, setTheoryData ] = useState([])
    const [ theory, setTheory ] = useState({
        theoryNumber: theoryNum,
        title: '',
        Description: '',
        image: ''
    })
    
    const addTheory = (e) => {
        e.preventDefault()
        setTheoryData([...theoryData, theory])
        setTheoryNum(theoryNum + 1)
    }
    
    const handleChangeTheory = (e) => {
        setTheory({
            ...theory, 
            theoryNumber: theoryNum,
            [e.target.name]: e.target.value
        })
    }
    return (
        <TheoryContext.Provider value={{
            addTheory,
            handleChangeTheory,
            theory,
            theoryData
        }}>
            {children}
        </TheoryContext.Provider>
    )
}