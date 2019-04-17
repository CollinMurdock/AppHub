var database;

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

function verifyCredentials() {
  let ref = database.ref('Accounts');
  ref.once('value', getAccountData, onError);
}

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
        sessionStorage.setItem("user", JSON.stringify(activeUser));
        console.log("Logged In success\nUsername: "
          +activeUser.username+" password: "+activeUser.password);
      }
    }
  }

  if (!success)
    alert("unsuccessful");
  else
      window.location.href="index.html";
}

function checkExistingUsername(){
  let ref = database.ref('Accounts');
  ref.once('value', compareUsernames, onError);
}

function compareUsernames(data){
  let username = $("#username").val();
  console.log(username);
  
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
    alert("Unable to create account");
  }
}

function makeAccount(username, password){
  let ref = database.ref('Accounts');
  let account = {
    username : username,
    password : password,
    accountType : "user"
  }
  
  ref.push(account);
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
  // where we check to make sure things aren't taken
  ref.push(app);
}


function getApp(key){
  let ref = database.ref('Apps');
  var app;

  ref.once('value',function(snapshot){
    snapshot.forEach(function(snapshot){
      if(key === snapshot.key){
        app = snapshot.val();
        console.log(snapshot.key);
        displayApp(app);
      }
    });
  });
}

