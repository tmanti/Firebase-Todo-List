
function addToList(){
  var input = document.getElementById("addTo").value;
  if(input.length > 0){
    document.getElementById("list").innerHTML += input + "<br />";
    document.getElementById("addTo").value = ""; 
  }
}

function searchKeyPress(e)
{
    // look for window.event in case event isn't passed in
    e = e || window.event;
    
    var input = document.getElementById("addTo").value;
    
    if(input.length > 0){
      if (e.keyCode == 13)
      {
          document.getElementById("addToButton").click();
          return false;
      } 
    }
    return true;
}