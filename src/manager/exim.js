

function exportFile(data){
    //create a file and put the content, name and type
    var file = new File(["\ufeff"+data], 'passLock.txt', {type: "text/plain:charset=UTF-8"});
  
    //create a ObjectURL in order to download the created file
    var url = window.URL.createObjectURL(file);
  
    //create a hidden link and set the href and click it
    var a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = file.name;
    a.click();
    window.URL.revokeObjectURL(url);
} 


function importFile(file, callback){
   
   var fileReader=new FileReader();
   fileReader.onload=function(){
      localStorage.data=fileReader.result;
      callback(JSON.parse(localStorage.data));
      clearFileInput(file.id);
   }
   fileReader.readAsText(file.files[0]);
   
}

function clearFileInput(id) 
{ 
    var oldInput = document.getElementById(id); 

    var newInput = document.createElement("input"); 

    newInput.type = "file"; 
    newInput.id = oldInput.id; 
    newInput.name = oldInput.name; 
    newInput.className = oldInput.className; 
    newInput.style.cssText = oldInput.style.cssText; 
    // TODO: copy any other relevant attributes 

    oldInput.parentNode.replaceChild(newInput, oldInput); 
}


export {exportFile, importFile}