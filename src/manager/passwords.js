import React from 'react';
import { decrypt } from './encryption';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { faCopy } from '@fortawesome/free-solid-svg-icons'

const Passwords = ({data, onUpdate, onImport, onExport, onDeleteAll}) => {
    const [showPassModalData, setshowPassModalData] = useState("");
    const [copied, setCopied] = useState(false);
    const[showPassModal, setshowPassModal] = useState(false);
    const[userPass, setUserPass] = useState("")
    const handleShow = (password) => {
        const key = prompt("Enter main password");
        if(key == null) {
            alert("Please enter password")
            return
        }

        setUserPass("" + decrypt(password, key))
        setshowPassModal(!showPassModal);
        // alert(decrypt(password, key));
    }

    const handlePassModal = () => {
      setshowPassModal(!showPassModal);
    }

    const deletePassword = (index, data) => {
      if(window.confirm("Are you sure?") === true) {
        data.splice(index, 1)
        onUpdate(data)  
      }
    }

    const handleCopied = () => {
      setCopied(true)
    }
    console.log(copied)


    return (
      <div className='password'>
        <h2 style={{display: 'inline', float: 'left'}}>Saved Passwords</h2>
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
                  <input type="button" value="Show password" onClick={handleShow.bind(this, item.password)}></input>
                </td>
                <td>
                  <FontAwesomeIcon icon={faTrash} onClick={deletePassword.bind(this, index, data)} style={{padding: 10}} title='Delete Password'/>
                </td>
              </tr>
            ))}

            {showPassModal 
            ?
            <div className='passModal'>
              <button className='passModalBtn' onClick={handlePassModal}>close</button>
              <div className='pm-ic'>
                <div className='pm-ic-child'>
                    <h2>Password: </h2>
                    <h2>{userPass}</h2>
                    <CopyToClipboard text={userPass} onCopy={() => setCopied(true)}>
                      <button className='spdBtn' onClick={handleCopied}>
                        <FontAwesomeIcon icon={faCopy}/>
                        {copied ? <span className='spdSpan'>Copied!</span> : ""}
                      </button>
                    </CopyToClipboard>
                  </div>
              </div>
            </div>
            :
            null}

          </tbody>
        </table>
      </div>
    );
  }
  
  export default Passwords;