import React, { useState } from "react";
import { encrypt } from "./encryption";
import { useNavigate } from "react-router";
import GeneratePasswordModal from "./generatePassword";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { toast, Bounce } from 'react-toastify';

const NewPassword = () => {
    const[formdata, setformdata] = useState({
        website:"",
        username:"",
        password:""
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        let name, value;
        // console.log(e.target.value)
        name= e.target.name;
        value= e.target.value;

        setformdata({...formdata, [name]:value})
    }

    const handleGeneratedPassword = (generatedPassword) => {
        if(generatedPassword){
            setformdata({...formdata, password: generatedPassword})
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(formdata.password);
        toast.info("Copied to clipboard", {
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

    let localData;
    const onSubmit = (e) => {
        e.preventDefault();

        if(!(formdata.username && formdata.website && formdata.password)) {
            return;
        }

        if(localStorage.getItem("data")){
            localData = JSON.parse(localStorage.getItem("data"))
        } else localData = []
        
        const key = prompt("Enter main password");
        if(key == null) {
            alert("Please enter password");
            return;
        }
        formdata.password = encrypt(formdata.password, key);
        const data = localData.concat(formdata);
        
        localStorage.setItem("data", JSON.stringify(data));

        setformdata({
            website:"",
            username:"",
            password:""
          });
        navigate('/', { replace: true });
    }

  return (
    <>
        <form onSubmit={onSubmit}>
            <table>
                <tr>
                    <th>Website</th>
                    <td><input 
                    type="text" 
                    name="website" 
                    value={formdata.website}
                    onChange={handleChange}
                    /></td>
                </tr>
                <tr>
                    <th>Username</th>
                    <td><input type="text" name="username" value={formdata.username} onChange={handleChange}/></td>
                </tr>
                <tr>
                    <th>Password</th>
                    <td><input type="password" name="password" value={formdata.password} onChange={handleChange}/> <FontAwesomeIcon style={{marginRight: 10, marginLeft: 10}} icon={faCopy} onClick={copyToClipboard}/> 
                    <GeneratePasswordModal handleGeneratedPassword={handleGeneratedPassword}/></td> 
                </tr>
                <tr>
                    <th>Submit</th>
                    <td> <button type="submit" > Submit </button> </td>
                </tr>
            </table>
        </form>
        </>
  )

}

export default NewPassword