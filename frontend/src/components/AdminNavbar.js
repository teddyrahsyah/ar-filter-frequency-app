import { Link } from "react-router-dom";
import logoAplikasi from '../asset/logoAplikasi.png'

const AdminNavbar = () => {
    return ( 
        <nav className="admin-navbar">
            <div className="navbar-logo">
                <Link to='/adminPanel'><img src={logoAplikasi} alt="Filter Frekuensi AR Simulator" /></Link>
            </div>
            <div className="menu-list">
                <Link to='/adminPanel' className="nav-link">List Artikel</Link>
                <Link to='/list-materi' className="nav-link">List Materi</Link>
                <Link to='/addForm' className="nav-link">Tambah Artikel / Materi</Link>
            </div>
            <Link to='/adminLogin' className="logout-btn btn">Logout</Link>
        </nav>  
    );
}
 
export default AdminNavbar;