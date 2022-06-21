import './style/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Admin Pages
import AdminPanelLogin from './pages/AdminPage/AdminPanelLogin';
import AddArticleForm from './pages/AdminPage/AddArticleForm';
import Home from './pages/AdminPage/Home';
import ListArticle from './pages/AdminPage/ListArticle';
import ListModul from './pages/AdminPage/ListModul';
import AdminHomePage from './pages/AdminPage/AdminHomePage';
import ModulePage from './pages/AdminPage/ModulePage';
import AddTheoryForm from './pages/AdminPage/AddTheoryForm';
import AddLabForm from './pages/AdminPage/AddLabForm';

// AR PAGES
import OutputWave from './pages/ARPage/OutputWave';
import ARPagesInfo from './pages/ARPage/ARPagesInfo';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Admin Page */}
                <Route exact path='/' element={<Home />} />
                <Route path='/adminLogin' element={<AdminPanelLogin />} />
                <Route path='/adminHomepage' element={<AdminHomePage />} />
                <Route path='/addForm' element={<AddArticleForm />} />
                <Route path='/addTheoryForm' element={<AddTheoryForm />} />
                <Route path='/addLabForm' element={<AddLabForm />} />
                <Route path='/listArtikel' element={<ListArticle />} />
                <Route path='/listModul' element={<ListModul />} />
                <Route path='/modul' element={<ModulePage />} />
                <Route path='/modul/:id' element={<ModulePage />} />

                {/* AR PAge */}
                <Route path='/ARApp' element={<ARPagesInfo />} />
                <Route path='/outputWave' element={<OutputWave />} />
            </Routes>
        </BrowserRouter>
    );  
}

export default App;
