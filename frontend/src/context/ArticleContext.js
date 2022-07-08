import axios from "axios";
import { createContext, useState } from "react";
import Cookies from "js-cookie"

export const ArticleContext = createContext()

export const ArticleContextProvider = ({ children }) => {

    const token = Cookies.get('token')

    // Article State
    const [ articleNum, setArticleNum ] = useState(1)
    const [ articleList, setArticleList ] = useState([])
    const [ article, setArticle ] = useState({
        theoryNumber: articleNum,
        title: '',
        category: '',
    })
    const [articleDescription, setArticleDescription] = useState('')
    const [image, setImage] = useState(null)

    // Theory CRUD
    const getArticle = async () => {
        const result = await axios.get('http://localhost:8000/api/article')
        const data = result.data.results
        setArticleList(data.map(article => {
            return {
                articleNumber: article.articleNumber,
                articleTitle: article.title,
                articleCategory: article.category
            }
        }))
    }
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

    const handleDescription = (desc) => {
        const str = desc.replace(/^\<p\>/,"").replace(/\<\/p\>$/,"");
        setArticleDescription(str)
    }

    const deleteArticle = (num) => {
        setArticleList(articleList.filter(article => article.articleNumber !== Number(num)));
    }

    return (
        <ArticleContext.Provider value={{
            getArticle,
            articleList,
            addArticle,
            handleChangeArticle,
            handleDescription,
            deleteArticle
        }}>
           {children} 
        </ArticleContext.Provider>
    )
}