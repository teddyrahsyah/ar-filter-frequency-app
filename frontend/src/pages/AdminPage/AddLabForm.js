import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { ModuleContext } from "../../context/ModuleContext";

const AddLabForm = () => {

    const {handleChangeLab, addLab} = useContext(ModuleContext)
    const navigate = useNavigate();

    const goBack = () => navigate(-1)

    const handleSubmitLab = (e) => {
        e.preventDefault()
        addLab()
        goBack()
    }

    return (
        <div className="admin-form-container">
            <AdminNavbar />
            <h1>Form Tambah Lab</h1>
            <form onSubmit={handleSubmitLab}>
                <input 
                    type="text" 
                    name='title' 
                    required 
                    placeholder="Judul Artikel" 
                    className="input-judul input-text" 
                    onChange={handleChangeLab}
                />
                <section className="add-image">
                    <label htmlFor="modelAR">Thumbnail AR:</label>
                    <input type="file" name='thumbnailAR' required className="input-image" accept="image/*"></input>
                </section>
                <textarea 
                    name="description"
                    required 
                    className="input-text input-isi" 
                    placeholder="Isi Artikel"
                    onChange={handleChangeLab}
                ></textarea>
                <section className="add-model">
                    <label htmlFor="modelAR">Model AR:</label>
                    <input type="file" name='modelAR' required className="input-model" accept=".gltf"></input>
                </section>
                <button className="add-form-btn btn-edited">Tambah</button>
            </form>
        </div>
    );
}
 
export default AddLabForm;