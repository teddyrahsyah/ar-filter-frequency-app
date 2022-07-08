import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { ModuleContext } from "../../context/ModuleContext";
import { useParams } from "react-router"
import { Editor } from '@tinymce/tinymce-react';

const AddTheoryForm = () => {
    const {id} = useParams()
    const {
        handleChangeTheory, 
        addTheory, 
        getDetailModule, 
        module, 
        handleImage, 
        handleDescription, 
        checkTheoryNumber, 
        checkLabNumber
    } = useContext(ModuleContext)

    const navigate = useNavigate();
    const editorRef = useRef(null);
    const goBack = () => navigate(-1)

    useEffect(() => {
        getDetailModule(id)
        checkTheoryNumber()
        checkLabNumber()
    },[])

    const handleSubmitTheory = (e) => {
        e.preventDefault()
        goBack()
    }   

    return (
        <div className="admin-form-container">
            <AdminNavbar />
            <h1>Form Tambah Materi</h1>
            <form onSubmit={handleSubmitTheory}>
                <input 
                    type="text" 
                    id='title' 
                    required 
                    placeholder="Judul Artikel" 
                    className="input-judul input-text" 
                    onChange={handleChangeTheory}
                />
                <section className="add-image">
                    <label htmlFor="modelAR">Image:</label>
                    <input 
                        type="file" 
                        name='image' 
                        required 
                        className="input-image" 
                        accept="image/*"
                        onChange={handleImage}
                    ></input>
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
                <button style={{"marginTop": '1rem'}} className="add-form-btn btn-edited" onClick={() => addTheory(id, module.moduleNumber, module.moduleTitle)}>Tambah</button>
            </form>
        </div>
    );
}
 
export default AddTheoryForm;