import './style/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ARPagesInfo from './pages/ARPagesInfo';
import AdminPanelLogin from './pages/AdminPanelLogin';
import AdminPanelForm from './pages/AdminPanelForm';
import Home from './pages/Home';
import AdminPanelListArticle from './pages/AdminPanelListArticle';
import AdminPanelListMateri from './pages/AdminPanelListMateri';
import OutputWave from './pages/OutputWave';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/adminLogin' element={<AdminPanelLogin />} />
                <Route path='/addForm' element={<AdminPanelForm />} />
                <Route path='/adminPanel' element={<AdminPanelListArticle />} />
                <Route path='/list-materi' element={<AdminPanelListMateri />} />
                <Route path='/ARApp' element={<ARPagesInfo />} />
                <Route path='/outputWave' element={<OutputWave />} />
            </Routes>
        </BrowserRouter>
    );  
}

export default App;
