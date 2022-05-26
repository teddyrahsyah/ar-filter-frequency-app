import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

const AdminPanelForm = () => {
    const [title, setTitle] = useState('Artikel')

    const changeTitle = e => {
        setTitle(e.target.value)
    }

    return ( 
        <div className="admin-panel-container admin-panel-form">
            <AdminNavbar />
            <h1>Tambah {title}</h1>
            <form>
                <div className="kategori-section">
                    <h3>Kategori :</h3>
                    <div className="kategori-group">
                        <input 
                            type="radio" 
                            name="kategori" 
                            id="artikel" 
                            className="radio-kategori" 
                            value="Artikel" 
                            onChange={changeTitle}
                        />
                        <label htmlFor="artikel">Artikel</label>
                        <input 
                            type="radio" 
                            name="kategori" 
                            id="materi" 
                            className="radio-kategori" 
                            value="Materi"
                            onChange={changeTitle}
                        />
                        <label htmlFor="materi">Materi</label>
                    </div>
                </div>
                <input type="text" placeholder="Judul Materi" className="input-judul input-text" />
                <textarea name="" className="input-text input-isi" id="" placeholder="Isi Materi"></textarea>
                <input type="text" placeholder="Tags" className="input-judul input-text" />
                <button className="add-btn btn">Tambah</button>
            </form>
        </div>
    );
}
 
export default AdminPanelForm;