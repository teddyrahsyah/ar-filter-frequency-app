import { Link } from "react-router-dom";
import logoAplikasi from '../asset/logoAplikasi.png'

const AdminNavbar = () => {
    return ( 
        <nav className="admin-navbar">
            <div className="logo-menu">
                <div className="navbar-logo">
                    <Link to='/adminHomepage'><img src={logoAplikasi} alt="Filter Frekuensi AR Simulator" /></Link>
                </div>
                <div className="menu-list">
                    <Link to='/listArtikel' className="nav-link">List Artikel</Link>
                    <Link to='/listModul' className="nav-link">List Modul</Link>
                </div>
            </div>
            <Link to='/adminLogin' className="logout-btn btn">Logout</Link>
        </nav>  
    );
}
 
export default AdminNavbar;