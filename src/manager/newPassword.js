import React, { useState } from "react";
import { encrypt } from "./encryption";
import { useNavigate } from "react-router";

const NewPassword = () => {
    const[formdata, setformdata] = useState({
        website:"",
        username:"",
        password:""
    })

    const navigate = useNavigate();

    let name, value;

    const handleChange = (e) => {
        // console.log(e.target.value)
        name= e.target.name;
        value= e.target.value;

        setformdata({...formdata, [name]:value})
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
        console.log(data);
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
                    <td><input 
                    type="text" 
                    name="username" 
                    value={formdata.username}
                    onChange={handleChange}
                    /></td>
                </tr>
                <tr>
                    <th>Password</th>
                    <td><input 
                    type="password" 
                    name="password" 
                    value={formdata.password}
                    onChange={handleChange} 
                    /></td>
                </tr>
                <tr>
                    <th>Submit</th>
                    <td> <button 
                    type="submit" 
                    //value="Submit"
                    //onClick={onSubmit}
                    >
                        Submit
                    </button>
                    </td>
                </tr>
            </table>
        </form>
        </>
  )

}

export default NewPassword