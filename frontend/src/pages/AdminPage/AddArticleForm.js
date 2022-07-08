import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { ArticleContext } from "../../context/ArticleContext";
import { Editor } from '@tinymce/tinymce-react';

const AddArticleForm = () => {
    const {handleChangeArticle, addArticle, handleDescription} = useContext(ArticleContext)
    const navigate = useNavigate();

    const goBack = () => navigate(-1)

    const handleSubmitArticle = (e) => {
        e.preventDefault()
        addArticle()
        goBack()
    }

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
        console.log(editorRef.current.getContent());
        }
    };

    
    return (
        <div className="admin-form-container">
            <AdminNavbar />
            <div style={{"width": "80vw", "margin": "auto"}}>
                <h1>Form Tambah Artikel</h1>
            </div>
            <form onSubmit={handleSubmitArticle}>
                <input 
                    type="text" 
                    name='title' 
                    required 
                    placeholder="Judul Artikel" 
                    className="input-judul input-text" 
                    onChange={handleChangeArticle}
                />
                <section className="add-image">
                    <label htmlFor="modelAR">Image:</label>
                    <input type="file" name='image' required className="input-image" accept="image/*"></input>
                </section>
                <Editor
                    textareaName="description"
                    onEditorChange={(newValue, editor) => handleDescription(newValue)}
                    apiKey="8dotdc22kact10o1q74xf3s2eurvoappeug7wgxa90gwt1sq"
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="Write here..."
                    plugins={['lists', 'nonbreaking', 'preview', 'image']}
                    init={{
                    menubar: false,
                    toolbar: 'undo redo | ' +
                    'bold italic underline | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' + 'blockquote image |', 
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                />
                <button className="add-form-btn btn-edited">Tambah</button>
            </form>
        </div>
    );
}
 
export default AddArticleForm;