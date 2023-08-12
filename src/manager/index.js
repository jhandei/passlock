import * as React from 'react';
import { Link } from 'react-router-dom'
import { Table,
    Header,
    HeaderRow,
    HeaderCell,
    Body,
    Row,
    Cell } from '@table-library/react-table-library/table';

import { decrypt } from './encryption';
import { exportFile, importFile } from './exim';


function Manager() {
    const [search, setSearch] = React.useState('');

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

    const handleShow = (password) => {
        const key = prompt("Enter main password");
        if(key == null) {
            alert("Please enter password")
            return
        }
        alert(decrypt(password, key));
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
            <Table data={data}>{(records) => (
                <>
                <Header>
                    <HeaderRow>
                        <HeaderCell>Website</HeaderCell>
                        <HeaderCell>Username</HeaderCell>
                        <HeaderCell>Password</HeaderCell>
                    </HeaderRow>
                </Header>

                <Body>
                    {records.map((record, index) => (
                        <Row key={index} item={record}>
                            <Cell>{record.website}</Cell>
                            <Cell>{record.username}</Cell>
                            <Cell><input type="button" value="Show password" onClick={handleShow.bind(this, record.password)}></input></Cell>
                        </Row>
                    ))}
                </Body>
                </>
            )}</Table>
        </>
    );
  }
  
  export default Manager;