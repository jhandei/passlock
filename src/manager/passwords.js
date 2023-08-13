import React from 'react';
import { decrypt } from './encryption';

function Passwords(data) {
    const handleShow = (password) => {
        const key = prompt("Enter main password");
        if(key == null) {
            alert("Please enter password")
            return
        }
        alert(decrypt(password, key));
    }

    return (
      <div>
        <h2>Saved Passwords</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Website</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, index) => (
              <tr key={index}>
                <td>{item.website}</td>
                <td>{item.username}</td>
                <td><input type="button" value="Show password" onClick={handleShow.bind(this, item.password)}></input></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Passwords;
  