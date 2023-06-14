import React, { useState } from "react";


const NewPassword = () => {
    const[formdata, setformdata] = useState([{
        website:"",
        username:"",
        password:""
    }])

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

        if(localStorage.getItem("data")){
            localData = JSON.parse(localStorage.getItem("data"))
        }else localData = []
        //console.log(localData);
        //console.log(formdata);
        // localStorage.clear()

        const data = localData.concat(formdata);
        console.log(data);
        localStorage.setItem("data", JSON.stringify(data));

        setformdata({
            website:"",
            username:"",
            password:""
          });
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