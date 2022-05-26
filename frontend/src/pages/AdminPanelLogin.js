import { Link } from "react-router-dom";
import logoAplikasi from '../asset/logoAplikasi.png'

const AdminPanelLogin = () => {
    return ( 
        <div className="admin-login-container admin-panel-container">
            <div className="logo">
                <img src={logoAplikasi} alt="logo aplikasi filter frekuensi AR simulator" />
            </div>
            <div className="login-form">
                <form>
                    <input type="text" className='input-text nama' placeholder='Nama' />
                    <input type="password" className='input-text password' placeholder='Password' />
                    <Link to='/adminPanel' className='login-btn btn'>Login</Link>
                </form>
            </div>
        </div>
    );
}
 
export default AdminPanelLogin;