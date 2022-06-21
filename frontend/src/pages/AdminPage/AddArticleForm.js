import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { ArticleContext } from "../../context/ArticleContext";

const AddArticleForm = () => {
    const {handleChangeArticle, addArticle} = useContext(ArticleContext)
    const navigate = useNavigate();

    const goBack = () => navigate(-1)

    const handleSubmitArticle = (e) => {
        e.preventDefault()
        addArticle()
        goBack()
    }
    return (
        <div className="admin-form-container">
            <AdminNavbar />
            <h1>Form Tambah Artikle</h1>
            <form onSubmit={handleSubmitArticle}>
                <input 
                    type="text" 
                    name='title' 
                    required 
                    placeholder="Judul Artikel" 
                    className="input-judul input-text" 
                    onChange={handleChangeArticle}
                />
                <section className="add-image">
                    <label htmlFor="modelAR">Image:</label>
                    <input type="file" name='image' required className="input-image" accept="image/*"></input>
                </section>
                <textarea 
                    name="description" 
                    required 
                    className="input-text input-isi" 
                    placeholder="Isi Artikel"
                    onChange={handleChangeArticle}
                ></textarea>
                <button className="add-form-btn btn">Tambah</button>
            </form>
        </div>
    );
}
 
export default AddArticleForm;