import AdminNavbar from "../components/AdminNavbar";
import List from "../components/List";

const AdminPanelListArticle = () => {
    return ( 
        <div className="admin-panel-container">
            <AdminNavbar />
            <div className="list-container">
                <h1>List Artikel</h1>
                <List />
            </div>
        </div>
    );
}
 
export default AdminPanelListArticle;