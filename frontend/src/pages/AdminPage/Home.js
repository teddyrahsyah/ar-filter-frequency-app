import { Link } from "react-router-dom";

const Home = () => {
    return ( 
        <div className="home">
            <Link to='/adminLogin' className="route-btn btn">Login Admin</Link>
            <Link to='/ARApp' className="route-btn btn">AR Application</Link>
        </div>
    );
}
 
export default Home;