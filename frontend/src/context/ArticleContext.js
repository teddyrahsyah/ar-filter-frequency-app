import { createContext, useState } from "react";

export const ArticleContext = createContext()

export const ArticleContextProvider = ({ children }) => {

    // Article State
    const [ articleNum, setArticleNum ] = useState(1)
    const [ articleList, setArticleList ] = useState([])
    const [ article, setArticle ] = useState({
        theoryNumber: articleNum,
        title: '',
        description: '',
        image: ''
    })

    // Theory CRUD
    const addArticle = () => {
        setArticleList([...articleList, article])
        setArticleNum(articleNum + 1)
    }
    
    const handleChangeArticle = (e) => {
        setArticle({
            ...article, 
            articleNumber: articleNum,
            [e.target.name]: e.target.value
        })
    }

    const deleteArticle = (num) => {
        setArticleList(articleList.filter(article => article.articleNumber !== Number(num)));
    }

    return (
        <ArticleContext.Provider value={{
            articleList,
            addArticle,
            handleChangeArticle,
            deleteArticle
        }}>
           {children} 
        </ArticleContext.Provider>
    )
}