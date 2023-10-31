import * as React from 'react';
import { Link } from 'react-router-dom'

import { decrypt } from './encryption';
import { exportFile, importFile } from './exim';
import {Navbar} from "./navbar"
import styles from "../custom.css";
import Passwords from './passwords';
import NewPassword from './newPassword';

function Manager() {
    const [search, setSearch] = React.useState('');
    const [showModal, setShowModal] = React.useState(false);

    var initialList = [];
    if(localStorage.getItem("data")){
        initialList = JSON.parse(localStorage.getItem("data"))
    }
    const [rowsData, setRowsData] = React.useState(initialList);

    console.log(rowsData);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const data = {
        nodes: rowsData.filter((item) =>
            item.username.includes(search) || item.website.includes(search)
        ),
    };

    const clearCache = () => {
        localStorage.clear()
        setRowsData([])
    }

 
    const handleExport = () => {
        exportFile(localStorage.data);
    }

    const handleImport = () => {
        var myFile = document.getElementById("myFile");
        importFile(myFile, setRowsData);
    }

    return (
        <div className='test'>
            {showModal ? <NewPassword /> : null}
            {showModal ? null :
                <div className="main">
                <label htmlFor="search">
                    Search:
                    <input id="search" type="text" onChange={handleSearch} />
                    <button id='add'>
                        {/* <Link to="/new"> */}
                        <Link onClick={() => setShowModal(true)}>
                            Add new
                        </Link>
                    </button>

                    <button id='clearCache' onClick={clearCache}>Clear Cache</button>
                    <button id='exportFile' onClick={handleExport}>Export File</button>

                    <input id="myFile" type='file' accept="text/plain" name="files[]" />
                    <button id='exportFile' onClick={handleImport}>import File</button>

                </label>

                <Passwords data={data.nodes} />
            </div>
            }
            
            {showModal ? <button onClick={() => setShowModal(false)} className="closeModal">close</button> : null}
        </div>
    );
  }
  
  export default Manager;