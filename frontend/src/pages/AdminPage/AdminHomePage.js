import { Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

const AdminHomePage = () => {
    return ( 
        <div className="admin-homepage-container">
            <AdminNavbar />
            <div className="card-list">
                <Link to='/listArtikel' className="card add-article add-link">
                    <h1>Tambah Artikel</h1>
                </Link>
                <Link to='/listModul' className="card add-modul add-link">
                    <h1>Tambah Modul</h1>
                </Link>
            </div>
        </div>
    );
}
 
export default AdminHomePage;