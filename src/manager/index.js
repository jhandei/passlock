import React, { useState } from "react";
import { Menu, Appbar } from "react-native-paper";
import { Link } from 'react-router-dom'

import { decrypt } from './encryption';
import { exportFile, importFile } from './exim';
import styles from "../custom.css";
import Passwords from './passwords';

function Manager() {
    const [search, setSearch] = useState('');
    const [rowsData, setRowsData] = useState(initialList);
    const [visible, setVisible] = useState(false);

    var initialList = [];
    if(localStorage.getItem("data")){
        initialList = JSON.parse(localStorage.getItem("data"))
    }
    
  
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

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
        <>

<Appbar.Header>
      <Appbar.Content title="Search Bar" />
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <Appbar.Action icon="dots-vertical" onPress={openMenu} />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={{ x: windowWidth, y: 100 }}
      >
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
    </Appbar.Header>
            <label htmlFor="search">
                Search:
                <input id="search" type="text" onChange={handleSearch} />
                <button id='add'>
                    <Link to="/new">
                        Add new
                    </Link>
                </button>

                <button id='clearCache' onClick={clearCache}>Clear Cache</button>
                <button id='exportFile' onClick={handleExport}>Export File</button>

                <input id="myFile" type='file' accept="text/plain" name="files[]" />
                <button id='exportFile' onClick={handleImport}>import File</button>

            </label>

            <Passwords data={data.nodes} />
        </>
    );
  }
  
  export default Manager;