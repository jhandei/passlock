import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import PasswordModal from './passwordModal';

const Passwords = ({data, onUpdate, onImport, onExport, onDeleteAll}) => {
    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState("");
  
    const toggleModal = (password) => {
      setModalData(password);
      setModal(!modal)
    }

    const closeModal = () => {
      setModal(false);
    }

    const deletePassword = (index, data) => {
      if(window.confirm("Are you sure?") === true) {
        data.splice(index, 1)
        onUpdate(data)  
      }
    }



    return (
      <div>
        {modal && <PasswordModal show={modal} handleClose={closeModal} encryptedPassword={modalData} />}
        <h2 style={{display: 'inline', float: 'left',  marginTop: 20}}>Saved Passwords</h2>
        <div style={{display: 'inline', float: 'right', marginTop: 20}}>
          <FontAwesomeIcon icon={faDownload} onClick={onExport} style={{padding: 10}} title='Download Passwords'/>
          <FontAwesomeIcon icon={faUpload} onClick={onImport} style={{padding: 10}} title='Upload Password File' />
          <FontAwesomeIcon icon={faTrash} onClick={onDeleteAll} style={{padding: 10}} title='Delete All Passwords'/>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Website</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.website}</td>
                <td>{item.username}</td>
                <td>
                  <input type="button" value="Show password" onClick={toggleModal.bind(this, item.password)}></input>
                </td>
                <td>
                  <FontAwesomeIcon icon={faTrash} onClick={deletePassword.bind(this, index, data)} style={{padding: 10}} title='Delete Password'/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Passwords;
  