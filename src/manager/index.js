import * as React from 'react';
import { Link } from 'react-router-dom'
import { Table,
    Header,
    HeaderRow,
    HeaderCell,
    Body,
    Row,
    Cell } from '@table-library/react-table-library/table';


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
            item.username.includes(search) | item.website.includes(search)
        ),
    };
    
    // const addNew = () => {
    //     window.open("new");
        // const newList = rowsData.concat({"website": "nothing.com", "username":"jhandei123@gmail.com", "password": "something4"});
        // setRowsData(newList);
        // localStorage.setItem("data", JSON.stringify(newList));
    // }

    const clearCache = () => {
        localStorage.clear()
        setRowsData([])
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
                            <Cell>Show password</Cell>
                        </Row>
                    ))}
                </Body>
                </>
            )}</Table>
        </>
    );
  }
  
  export default Manager;