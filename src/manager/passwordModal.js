import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { decrypt } from './encryption';
import { faCopy, faEye, faEyeDropper, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import { toast, Bounce } from 'react-toastify';

const PasswordModal = ({show, handleClose, encryptedPassword}) => {

    const [decrypted, setDecrypted] = useState(false); 
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleDecryption = () => {
        setShowPassword(false);
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

    const handleKeyUp = (event) => {
        if(event.keyCode == 13){
            handleDecryption();
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        toast.info('Copied!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }

    return (
        <Modal show={show} onHide={handleClose} onKeyUp={handleKeyUp}>
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                { !decrypted ? <p>Input your decryption key: <input id="decryptionkey" type='password'></input></p> :
                <><p>Your password is: <input type={showPassword ? "text" : "password"} value={password.toString()} readOnly></input> {showPassword ? <FontAwesomeIcon icon={faEye} onClick={() => setShowPassword(false)} /> : <FontAwesomeIcon icon={faEyeSlash} onClick={() => setShowPassword(true)} />}  <FontAwesomeIcon icon={faCopy} onClick={copyToClipboard}/></p> </>}
            
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleDecryption}>{decrypted? "Ok": "Decrypt"}</Button>
            </Modal.Footer>
        </Modal>
        );
}

export default PasswordModal;