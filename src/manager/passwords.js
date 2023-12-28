import React from 'react';
import { decrypt } from './encryption';

const Passwords = ({data, onUpdate}) => {
    const handleShow = (password) => {
        const key = prompt("Enter main password");
        if(key == null) {
            alert("Please enter password")
            return
        }
        alert(decrypt(password, key));
    }

    const deletePassword = (index, data) => {
      if(window.confirm("Are you sure?") === true) {
        data.splice(index, 1)
        onUpdate(data)  
      }
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
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.website}</td>
                <td>{item.username}</td>
                <td>
                  <input type="button" value="Show password" onClick={handleShow.bind(this, item.password)}></input>
                  <input type="button" value="Delete password" onClick={deletePassword.bind(this, index, data)}></input>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Passwords;
  