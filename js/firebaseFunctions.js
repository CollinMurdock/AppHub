var database;


//function to initialize the Firebase reference
function initializeFirebase() {
  var config = {
    apiKey: "AIzaSyD7gIjZY2-hxf4VomP9OVgpdYEQ56BiZV0",
    authDomain: "test-24872.firebaseapp.com",
    databaseURL: "https://test-24872.firebaseio.com",
    projectId: "test-24872",
    storageBucket: "test-24872.appspot.com",
    messagingSenderId: "235886486129"
  };
  firebase.initializeApp(config);

  database = firebase.database();
}

//when logging in
function verifyCredentials() {
  let ref = database.ref('Accounts');
  ref.once('value', getAccountData, onError);
}

//check the user's input to account data
function getAccountData(data) {
  let username = $("#username").val();
  let password = $("#password").val();

  let accountData = data.val();
  let keys = Object.keys(accountData);

  let success = false;
  let user;


  for (let k of keys) {

    if (accountData[k].username === username) {
      if (accountData[k].password === password) {
        success = true;
        if(accountData[k].accountType === "user"){
          activeUser = new User(username, password);
        }else if(accountData[k].accountType === "moderator"){
          activeUser = new Moderator(username, password);
        }else{
          activeUser = new Admin(username, password);
        }
        //add logged in user to sessionStorage
        //sessionStorage can only take string types,
        //will .stringify() and .parse() later
        sessionStorage.setItem("user", JSON.stringify(activeUser));
      }
    }
  }

  if (!success)
    alert("unsuccessful");
  else
      window.location.href="index.html"; //link to home page
}


//checks user names against usernames already taken when creating an account
function checkExistingUsername(){
  let ref = database.ref('Accounts');
  ref.once('value', compareUsernames, onError);
}

function compareUsernames(data){
  let username = $("#username").val();
  
  let accountData = data.val();
  let keys = Object.keys(accountData);
  
  let available = true;
  
  for(let k of keys){
    if(accountData[k].username === username)
      available = false;
  }
  
  if(available){
    makeAccount(username, $("#password").val());
  }else{
    alert("Username Taken");
  }
}

//adds the user object to firebase
function makeAccount(username, password){
  if(username === '' || password === '') return;
  let ref = database.ref('Accounts');
  let account = {
    username : username,
    password : password,
    accountType : "user" 
  }
  //accountType is default user, only people with access to
  //firebase can change a user's account level

  ref.push(account);
  //add the user to sessionStorage and link to index
  activeUser = new User(username, password);
  sessionStorage.setItem("user", JSON.stringify(activeUser));
  window.location.href="index.html";
}

function onError(error) {
  console.log('Error');
  console.log(error);
}



function createApp(app){
  let ref = database.ref('Apps');
  
  ref.push(app);
}

function proposeApp(app){
  //adds to proposed node
  let ref = database.ref('ProposedApps');
  console.log("hey");
  var valid = true;

  //make sure the app is valid
  ref.once('value',function(snapshot){
    snapshot.forEach(function(data){
      //check the proposed names against current app names
      if(data.name.toUpperCase() == app.name.toUpperCase()){
        alert("App name is already taken");
      }
    });
  });

  if(valid)
    ref.push(app);
}

//pushes a comment to firebase to app with key
function addComment(key, comment){
  let ref = database.ref('Apps/'+key+'/comments');
  
  ref.push(comment);
}

//removes a comment with commentKey from app with appKey 
function deleteComment(appKey, commentKey){
  var conf = confirm("Do you wish to delete this comment?");
  if(conf == true){
    //reference to the list of comments of the app
    let ref = database.ref('Apps/'+ appKey +'/comments');
    console.log("deleting comment: "+ref.child(commentKey));
    //deleting the comment
    ref.child(commentKey).remove();
    displayAllComments(); //reload the comments
  }
}
