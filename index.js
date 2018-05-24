var uid;
var database;
var username;
var data;
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    uid = firebase.auth().currentUser.uid;
    database = firebase.firestore()
    username = firebase.auth().currentUser.email;
    USER = user
    DB = database
    database.collection("users").doc(username).get().then(function(doc){
      if(doc.exists){
        data = doc.data();
        DB = database.collection("users").doc(user.email);
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