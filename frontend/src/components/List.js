import editIcon from '../asset/icons/edit.svg'
import deleteIcon from '../asset/icons/delete.svg'

const List = () => {
    return ( 
        <div className="list">
            <p className="judul-artikel">Judul Artikel</p>
            <div className="call-to-action">
                <button className="edit-btn">
                    <img src={editIcon} className='cta-btn' alt="edit" />
                </button>
                <button className="delete-btn" >
                    <img src={deleteIcon} className='cta-btn' alt="delete" />
                </button>
            </div>
        </div>
    );
}
 
export default List;