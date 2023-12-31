import * as React from 'react';
import { Link } from 'react-router-dom'

import { decrypt } from './encryption';
import { exportFile, importFile } from './exim';
import styles from "../custom.css";
import Passwords from './passwords';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

function Manager() {
    const [search, setSearch] = React.useState('');

    var initialList = [];
    if(localStorage.getItem("data")){
        initialList = JSON.parse(localStorage.getItem("data"))
    }
    const [rowsData, setRowsData] = React.useState(initialList);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const data = {
        nodes: rowsData.filter((item) =>
            item.username.includes(search) || item.website.includes(search)
        ),
    };

    const handleDeleteAll = () => {
        localStorage.clear()
        setRowsData([])
    }

    const handleUpdate = (data) => {
        setRowsData(data)
        localStorage.setItem("data", JSON.stringify(data));
    }

    const handleExport = () => {
        exportFile(localStorage.data);
    }
    
    const handleImport = event => {
        var hiddenFileInput = document.getElementById("myFile");
        hiddenFileInput.click();
    };
    
    const handleChange = event => {
        const fileUploaded = event.target;
        importFile(fileUploaded, setRowsData);
    };

    return (
        <>
            <div style={{ width: "100%" }}>
                <label htmlFor="search" style={{display: 'inline'}}>Search: </label>
                <input id="search" type="text" onChange={handleSearch} placeholder='Search websites or username' 
                style={{width: '68%'}} />
                
                <button id='add' style={{float: 'right'}}>
                    <Link to="/new">
                       <FontAwesomeIcon icon={faAdd} /> Add new Password
                    </Link>
                </button>
            </div>
                
            <Passwords data={data.nodes} onUpdate={handleUpdate} onImport={handleImport} onExport={handleExport} onDeleteAll={handleDeleteAll}/>
            <input id="myFile" type='file' onChange={handleChange} accept="text/plain" name="files[]" style={{display: 'none'}} />

        </>
    );
  }
  
  export default Manager;