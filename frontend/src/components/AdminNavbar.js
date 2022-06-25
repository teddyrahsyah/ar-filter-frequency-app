import { Link } from "react-router-dom";
import logoAplikasi from '../asset/logoAplikasi.png'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

const AdminNavbar = () => {
    const navigate = useNavigate()    

    const handleLogout = () => {
        Cookies.remove('username')
        Cookies.remove('token')
        navigate('/adminLogin')
    }

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
            <button onClick={handleLogout} className="logout-btn btn">Logout</button>
        </nav>  
    );
}
 
export default AdminNavbar;