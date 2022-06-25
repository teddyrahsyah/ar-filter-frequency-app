import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { ModuleContext } from "../../context/ModuleContext";
import { useParams } from "react-router"

const AddTheoryForm = () => {
    const {id} = useParams()
    const {handleChangeTheory, addTheory, getDetailModule, module} = useContext(ModuleContext)
    const navigate = useNavigate();

    const goBack = () => navigate(-1)

    useEffect(() => {
        addTheory(id)
    },[])

    const handleSubmitTheory = (e) => {
        e.preventDefault()
        addTheory()
        goBack()
    }

    return (
        <div className="admin-form-container">
            <AdminNavbar />
            <h1>Form Tambah Materi</h1>
            <form onSubmit={handleSubmitTheory}>
                <input 
                    type="text" 
                    name='title' 
                    required 
                    placeholder="Judul Artikel" 
                    className="input-judul input-text" 
                    onChange={handleChangeTheory}
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
                    onChange={handleChangeTheory}
                ></textarea>
                <button className="add-form-btn btn">Tambah</button>
            </form>
        </div>
    );
}
 
export default AddTheoryForm;