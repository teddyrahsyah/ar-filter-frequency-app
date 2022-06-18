import AdminNavbar from "../components/AdminNavbar";
import List from "../components/List";
import video from '../asset/video.mp4'

const AdminPanelListArticle = () => {
    return ( 
        <div className="admin-panel-container">
            <AdminNavbar />
            <div className="list-container">
                <h1>List Artikel</h1>
                <video src={video} id="video" loop controls></video>
                <List />
            </div>
        </div>
    );
}
 
export default AdminPanelListArticle;