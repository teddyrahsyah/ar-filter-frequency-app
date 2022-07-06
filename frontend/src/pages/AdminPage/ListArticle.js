import { useContext } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { ArticleContext } from "../../context/ArticleContext";
import editIcon from '../../asset/icons/edit.svg'
import deleteIcon from '../../asset/icons/delete.svg'
import { useEffect } from "react";

const AdminPanelListArticle = () => {
    const {articleList, deleteArticle, getArticle} = useContext(ArticleContext)

    useEffect(() => {
        getArticle()
    })

    return ( 
        <div className="admin-panel-container">
            <AdminNavbar />
            <div className="list-container">
                <h1 className="list-title">List Artikel</h1>
                <Link to='/addForm'><button className="btn-edited add-module-btn">Tambah Article</button></Link>
                {articleList.map((article) => (
                    <div className="list" key={article.articleNumber}>
                        <p className="judul-materi">
                            {article.title}
                        </p>
                        <div className="call-to-action">
                            <Link to='/addForm' className="edit-btn">
                                <img src={editIcon} className='cta-btn' alt="edit"  />
                            </Link>
                            {console.log(article.theoryNumber)}
                            <button className="delete-btn" value={article.articleNumber}>
                                <img src={deleteIcon} className='cta-btn' alt="delete" onClick={(e) => deleteArticle(e.target.parentElement.value)} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default AdminPanelListArticle;