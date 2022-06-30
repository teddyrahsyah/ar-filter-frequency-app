import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { ArticleContext } from "../../context/ArticleContext";
import { Editor } from '@tinymce/tinymce-react';

const AddArticleForm = () => {
    const {handleChangeArticle, addArticle} = useContext(ArticleContext)
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
                <Editor
                    apiKey="8dotdc22kact10o1q74xf3s2eurvoappeug7wgxa90gwt1sq"
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="<p>Write here...</p>"
                    init={{
                    menubar: false,
                    plugins: [
                        'lists advlist autolink link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | ' +
                    'bold italic underline | alignleft aligncenter ' +
                    'alignright alignjustify | outdent indent | ' + 'blockquote formatselect |', 
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                />
            </div>
            {/* <form onSubmit={handleSubmitArticle}>
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
                <textarea 
                    name="description" 
                    required 
                    className="input-text input-isi" 
                    placeholder="Isi Artikel"
                    onChange={handleChangeArticle}
                ></textarea>
                <button className="add-form-btn btn-edited">Tambah</button>
            </form> */}
        </div>
    );
}
 
export default AddArticleForm;