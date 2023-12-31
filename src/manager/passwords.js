import React from 'react';
import { decrypt } from './encryption';
import { useState } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons'

function Passwords(data) {
    const [showPassData, setshowPassData] = useState("");
    const [copied, setCopied] = useState(false);

    const handleShow = (password) => {
        const key = prompt("Enter main password");
        if(key == null) {
            alert("Please enter password")
            return
        }
        //console.log(showPassData);
        setshowPassData(decrypt(password, key));
        // alert(decrypt(password, key));
    }
    // console.log("" + showPassData)

    const handleCopied = () => {
      setCopied(true)
    }
    console.log(copied)

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
                <td className='showPassDiv'>
                    {/* <input type="button" value="Show password" onClick={handleShow.bind(this, item.password)} /> */}
                    <div className='spDiv' onClick={handleShow.bind(this, item.password)}>
                      {showPassData=="" ? "Show password" : "" + showPassData}
                    </div>
                    <CopyToClipboard text={showPassData} onCopy={() => setCopied(true)}>
                      <button className='spdBtn' onClick={handleCopied}>
                        <FontAwesomeIcon icon={faCopy}/>
                        {copied ? <span className='spdSpan'>Copied!</span> : ""}
                      </button>
                    </CopyToClipboard>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Passwords;
  