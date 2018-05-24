var uid;
var database;
var username;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    uid = firebase.auth().currentUser.uid;
    database = firebase.database()
    username = firebase.auth().currentUser;
  } else {
    window.assign.location("SignIn.html");
  }
});

function addToList(){
  var input = document.getElementById("addTo").value;
  if(input.length > 0){
   // document.getElementById("list").innerHTML += input + "<br />";
    //document.getElementById("addTo").value = ""; 
    writeNewPost(uid, username, Date.now(), input);
    
  }
}

function checkAuth(){
  var user = firebase.auth().currentUser;
  alert(uid);
  
}

function writeNewPost(uid, username, time, message) {
    // A post entry.
    var postData = {
      user: username,
      uid: uid,
      message: message,
      time: time
    };
  
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/user/' + uid + '/' + newPostKey] = postData;
  
    return firebase.database().ref().update(updates);
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