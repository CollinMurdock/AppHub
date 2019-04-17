
var activeUser;

//gets run before anything
$(document).ready(function(){
	initializeFirebase();
	var user = sessionStorage.getItem("user");
	if(user !== null){
		userLoggedIn(user);
	}else{
		console.log("No one logged in");
	}
	

	let platforms = ["iOS", "Android"];

	//a basic app
	let app = new App("Facebook",
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a eros quis odio scelerisque rhoncus non sed lorem. Nunc tempus augue sed urna egestas, sit amet eleifend ex cursus. Nunc pellentesque eros aliquet nisi hendrerit imperdiet. Aliquam ornare rhoncus volutpat. Duis vitae tellus et purus facilisis blandit. Vestibulum nec ante sed quam dignissim iaculis. Suspendisse in ornare mi, ac mollis orci. Quisque lorem leo, varius non placerat non, interdum non erat. Curabitur congue, sapien ut condimentum facilisis, arcu enim pretium mi, ut faucibus sem neque non tortor. Suspendisse luctus dui eget mi dignissim faucibus. Donec iaculis mi non velit ultricies, dapibus accumsan sem convallis. Ut ac elit mi. Nulla facilisi. Maecenas eu ex maximus, pulvinar nunc sollicitudin, cursus metus.\
					Cras efficitur, nulla ut luctus ultrices, sapien est egestas turpis, at cursus ante dolor et nulla. Suspendisse vestibulum velit ut ipsum fringilla viverra. Curabitur condimentum, elit mollis iaculis lacinia, risus mauris laoreet nunc, nec rutrum tellus ligula sit amet dui. Maecenas tortor est, semper nec diam a, placerat elementum odio. Quisque magna dolor, rutrum at interdum id, volutpat quis diam. Integer volutpat euismod placerat. Fusce justo quam, fringilla nec interdum non, venenatis id arcu. Aliquam posuere urna eget auctor porta. Fusce.",
					["Collin", "Jason"],
					platforms,
					"12.2",
					0,
					"https://facebook.com",
					"Status");
	
	//createApp(app);
	
});

function userLoggedIn(user){
	activeUser = JSON.parse(user);
	console.log("Logged in! Username: "+activeUser.username);
	$("#login-button").css("display","none");
	$("#create-button").css("display","none");
	$("#signout-button").css("display","inline");
	$("#proposal-button").css("display","inline");	
	$("#welcome-user").css("display","block");

}

function signOut(){
	sessionStorage.removeItem("user");
	location.reload(true);
	console.log("signed out");
}


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



