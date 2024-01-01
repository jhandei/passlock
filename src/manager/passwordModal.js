import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';  
import { decrypt } from './encryption';


const PasswordModal = ({show, handleClose, encryptedPassword}) => {

    const [decrypted, setDecrypted] = useState(false); 
    const [password, setPassword] = useState('');

    const handleDecryption = () => {
        if(!decrypted) {
            let decryptionKey = document.getElementById("decryptionkey").value;
            if (decryptionKey) {
                setDecrypted(true)
                setPassword(decrypt(encryptedPassword, decryptionKey))
            }
        } else {
            handleClose();
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {!decrypted && (<p>Input your decryption key: <input id="decryptionkey" type='password'></input></p>)}
                {decrypted && (<p>Your password is: {password.toString()} </p>) }
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleDecryption}>{decrypted? "Ok": "Decrypt"}</Button>
            </Modal.Footer>
        </Modal>
        );
}

export default PasswordModal;