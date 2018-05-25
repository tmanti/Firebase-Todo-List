var uid;
var database;
var data;
var username;
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

console.log(firebase.auth().currentUser);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    uid = firebase.auth().currentUser.uid;
    database = firebase.firestore()
    username = firebase.auth().currentUser.email;
    USER = user
    DB = database
    firestore.collection("users").doc(firebase.auth().currentUser.email).onSnapshot(function(doc) {
      console.log("check")
    });
    database.collection("users").doc(username).get().then(function(doc){
      if(doc.exists){
        data = doc.data();
        DB = database.collection("users").doc(user.email);
        if(data["todo"].length > 0){
          for(i = 0; i<data["todo"].length; i++){
            document.getElementById("list").innerHTML += data["todo"][i] + "<button id=" + i + " style='float: right;' onClick='remove(" + i + ")'>X</button>" + "</br></br>"
          }
        }
      } else{
        init();
      }
    });
  } else {
    window.assign.location("index.html");
  }
});

function init(){
  if(USER&&DB){
    var progress = newUser();
    DB.collection("users").doc(username).set(progress).then(function(doc){
      loction.reload();
    }).catch(function(error){
      console.log(error.message);
    });
  }
}

function remove(x){
  var arr = data["todo"];
  arr.splice(x, 1);
  data["todo"] = arr;
  database.collection("users").doc(username).set(data).then(function(){
    console.log("Written!")
  });
  document.getElementById("list").innerHTML = ""
  if(data["todo"].length > 0){
    for(i = 0; i<data["todo"].length; i++){
      document.getElementById("list").innerHTML += data["todo"][i] + "<button id=" + i + " style='float: right;' onClick='remove(" + i + ")'>X</button>" + "</br></br>"
    }
  }
}

function newUser(){
  return {
    "todo": []
  }
}

function addToList(){
  var input = document.getElementById("addTo").value;
  if(input.length > 0){
   //input + "<br />";
    data["todo"].push(input)
    database.collection("users").doc(username).set(data).then(function(){
      console.log("Written!")
    });
    document.getElementById("addTo").value = "";
    document.getElementById("list").innerHTML = ""
    if(data["todo"].length > 0){
      for(i = 0; i<data["todo"].length; i++){
        document.getElementById("list").innerHTML += data["todo"][i] + "<button id=" + i + " style='float: right;' onClick='remove(" + i + ")'>X</button>" + "</br></br>"
      }
    }
  }
}

function checkAuth(){
  var user = firebase.auth().currentUser;
  alert(uid);
  
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