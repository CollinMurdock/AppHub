


function logIn(){
	var username = $("#username").val();
	var password = $("#password").val();

	var user = new User(username, password);
	verifyCredentials();
}



function createAccount(){
	var username = $("#username").val();
	var password = $("#password").val();
	var password2 = $("#password2").val();

	checkExistingUsername(new User(username, password)); //firebaseFunctions.js
}

function submitApp(){
	let app = {
	var appName = $("#AppTitle").val();
	var desc = $("#Description").val();
	var devs = $("#Developers").val();
	var version = $("#Version").val();
	var price = $("#Price").val();
	var links = $("#Links").val();
	}

}
