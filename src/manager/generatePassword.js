const GeneratePasswordModal  = ({ handleGeneratedPassword }) => {

    const numbers = "0123456789";
    const smallCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const capitalCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const generateStrongRandomPassword = (e) => {

        var length = parseInt(document.getElementById("length").value);
        var includeSmallcase = document.getElementById("include-smallcase").checked;
        var includeUppercase = document.getElementById("include-uppercase").checked;
        var includeNumbers = document.getElementById("include-numbers").checked;
        var includeSymbols = document.getElementById("include-symbols").value;

        var allChars = includeSymbols;
        
        if(includeNumbers){
            allChars += numbers;
        }

        if(includeSmallcase){
            allChars += smallCaseChars; 
        }

        if(includeUppercase){
            allChars += capitalCaseChars;
        }

        var password = "";
        for (var i = 0; i < length; i++) {
            var randomNumber = Math.floor(Math.random() * allChars.length);
            password += allChars.substring(randomNumber, randomNumber +1);
        }        
        handleGeneratedPassword(password)
        resetInputs()
    }

    const closeDialogue = (e) => {        
        handleGeneratedPassword("")
        resetInputs()
    }
    
    const resetInputs = () => {
        document.getElementById("length").value = 12;
        document.getElementById("include-smallcase").checked = true;
        document.getElementById("include-uppercase").checked = true;
        document.getElementById("include-numbers").checked = true;
        document.getElementById("include-symbols").value = "!@#$%^&*()";
    }

    return (
    <div style={{display: "inline", paddingBlockStart: 10, paddingLeft: 10, paddingRight: 10, paddingBlockEnd: 10}}>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#generatePassword">
        Generate Password
      </button>
      
      <div className="modal fade" id="generatePassword" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Generate Password</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="form-group">
                    <input type="number" id="length" placeholder="Enter length of password" min="1" max="128" defaultValue={12} required/>
                    <label htmlFor="length">Length of Password</label>
                </div>
                <div className="form-group">
                <input type="checkbox" id="include-smallcase" defaultChecked />
                    <label htmlFor="include-smallcase">Include Smallcase letters</label>
                    
                </div>
                <div className="form-group">
                    <input type="checkbox" id="include-uppercase" defaultChecked />
                    <label htmlFor="include-uppercase">Include Uppercase letters</label>
                </div>
                <div className="form-group">
                    <input type="checkbox" id="include-numbers" defaultChecked />
                    <label htmlFor="include-numbers">Include Numbers</label>
                </div>
                <div className="form-group">
                    <input type="text" id="include-symbols" placeholder="Enter required symbols" defaultValue="!@#$%^&*()" />
                    <label htmlFor="include-symbols">Include Symbols</label>
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeDialogue} data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={generateStrongRandomPassword} data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>    
      </div>
    );
  };


  export default GeneratePasswordModal;