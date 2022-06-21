import { createContext, useState } from "react";

const TheoryContext = createContext()

const TheoryContextProvider = ({ children }) => {
    const [ theoryNum, setTheoryNum ] = useState(1)
    const [ theoryList, setTheoryList ] = useState([])
    const [ theory, setTheory ] = useState({
        theoryNumber: theoryNum,
        title: '',
        Description: '',
        image: ''
    })
    
    const addTheory = (e) => {
        e.preventDefault()
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
    return (
        <TheoryContext.Provider value={{
            addTheory,
            handleChangeTheory,
            theory,
            theoryList
        }}>
            {children}
        </TheoryContext.Provider>
    )
}