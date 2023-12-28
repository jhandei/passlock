const GeneratePasswordModal  = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

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
        handleClose(password)
    }

    const closeDialogue = (e) => {        
        handleClose("")
    }

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
        <div className="container">
            <h1>Password Generator</h1>
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
                <button type="button" onClick={closeDialogue}>
                    Close
                </button>
                <button type="button" onClick={generateStrongRandomPassword}>
                    Generate
                </button>
            </div>
                </section>
      </div>
    );
  };


  export default GeneratePasswordModal;