import AdminNavbar from "../components/AdminNavbar";
import List from "../components/List";

const AdminPanelListMateri = () => {
    return ( 
        <div className="admin-panel-container">
            <AdminNavbar />
            <div className="list-container">
                <h1>List Materi</h1>
                <List />
            </div>
        </div>
    );
}
 
export default AdminPanelListMateri;