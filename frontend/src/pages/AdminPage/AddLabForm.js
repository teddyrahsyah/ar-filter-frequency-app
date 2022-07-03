import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { ModuleContext } from "../../context/ModuleContext";
import { useParams } from "react-router"
import { Editor } from '@tinymce/tinymce-react';

const AddLabForm = () => {
    const {id} = useParams()
    const {handleChangeLab, addLab, handleImage, handleModel, getDetailModule, module, handleDescription} = useContext(ModuleContext)
    const navigate = useNavigate();
    const editorRef = useRef(null);

    const goBack = () => navigate(-1)

    const handleSubmitLab = (e) => {
        e.preventDefault()
        addLab(id, module.moduleNumber, module.moduleTitle)
        goBack()
    }

    useEffect(() => {
        getDetailModule(id)
    },[])

    return (
        <div className="admin-form-container">
            <AdminNavbar />
            <h1>Form Tambah Lab</h1>
            <form onSubmit={handleSubmitLab}>
                <input 
                    type="text" 
                    name='title' 
                    required 
                    placeholder="Judul Artikel" 
                    className="input-judul input-text" 
                    onChange={handleChangeLab}
                />
                <section className="add-image">
                    <label htmlFor="thumbnail">Thumbnail AR:</label>
                    <input 
                        type="file" 
                        name='thumbnail' 
                        required 
                        className="input-image" 
                        accept="image/*"
                        onChange={handleImage}
                    />
                </section>
                <section className="add-model">
                    <label htmlFor="model">Model AR:</label>
                    <input 
                        type="file" 
                        name='model' 
                        required 
                        className="input-model" 
                        accept=".gltf"
                        onChange={handleModel}
                    />
                </section>
                <Editor
                    textareaName="description"
                    onEditorChange={(newValue, editor) => handleDescription(newValue)}
                    apiKey="8dotdc22kact10o1q74xf3s2eurvoappeug7wgxa90gwt1sq"
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="Write here..."
                    init={{
                    menubar: false,
                    toolbar: 'undo redo | ' +
                    'bold italic underline | alignleft aligncenter ' +
                    'alignright alignjustify | outdent indent | ' + 'blockquote formatselect |', 
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                />
                <button className="add-form-btn btn-edited">Tambah</button>
            </form>
        </div>
    );
}
 
export default AddLabForm;