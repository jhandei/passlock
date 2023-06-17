import * as React from 'react';
import { Link } from 'react-router-dom'
import { Table,
    Header,
    HeaderRow,
    HeaderCell,
    Body,
    Row,
    Cell } from '@table-library/react-table-library/table';

import { encrypt, decrypt } from './encryption';


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
        const main = prompt("Enter main password");
        alert(decrypt(password));
    }

    return (
        <>
            <label htmlFor="search">
                Search by Task:
                <input id="search" type="text" onChange={handleSearch} />
                {/* <button id='add' onClick={addNew}>Add new</button> */}
                <button id='add'>
                    <Link to="/new">
                        Add new
                    </Link>
                </button>

                <button id='clearCache' onClick={clearCache}>Clear Cache</button>
            </label>
            <Table data={data}>{(recordss) => (
                <>
                <Header>
                    <HeaderRow>
                        <HeaderCell>Website</HeaderCell>
                        <HeaderCell>Username</HeaderCell>
                        <HeaderCell>Password</HeaderCell>
                    </HeaderRow>
                </Header>

                <Body>
                    {recordss.map((record, index) => (
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