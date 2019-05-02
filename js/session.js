
var activeUser;
var MAX_COMMENT_TITLE_LENGTH = 75;
var MAX_COMMENT_BODY_LENGTH = 350;

//gets run before anything
$(document).ready(function(){
	initializeFirebase();
	var user = sessionStorage.getItem("user");
	if(user !== null){
		userLoggedIn(user);
	}else{
		console.log("No one logged in");
	}
	

	var dev = $("#whatever").val();

	var devs = [dev, "me"];

	let platforms = ["iOS", "Android"];

	//a basic app
	let app = new App("Snapchat",
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a eros quis odio scelerisque rhoncus non sed lorem. Nunc tempus augue sed urna egestas, sit amet eleifend ex cursus. Nunc pellentesque eros aliquet nisi hendrerit imperdiet. Aliquam ornare rhoncus volutpat. Duis vitae tellus et purus facilisis blandit. Vestibulum nec ante sed quam dignissim iaculis. Suspendisse in ornare mi, ac mollis orci. Quisque lorem leo, varius non placerat non, interdum non erat. Curabitur congue, sapien ut condimentum facilisis, arcu enim pretium mi, ut faucibus sem neque non tortor. Suspendisse luctus dui eget mi dignissim faucibus. Donec iaculis mi non velit ultricies, dapibus accumsan sem convallis. Ut ac elit mi. Nulla facilisi. Maecenas eu ex maximus, pulvinar nunc sollicitudin, cursus metus.\
					Cras efficitur, nulla ut luctus ultrices, sapien est egestas turpis, at cursus ante dolor et nulla. Suspendisse vestibulum velit ut ipsum fringilla viverra. Curabitur condimentum, elit mollis iaculis lacinia, risus mauris laoreet nunc, nec rutrum tellus ligula sit amet dui. Maecenas tortor est, semper nec diam a, placerat elementum odio. Quisque magna dolor, rutrum at interdum id, volutpat quis diam. Integer volutpat euismod placerat. Fusce justo quam, fringilla nec interdum non, venenatis id arcu. Aliquam posuere urna eget auctor porta. Fusce.",
					["Span Inc"],
					platforms,
					"10.2",
					0,
					"https://snapchat.com",
					"Images");
	
	//createApp(app);
});

function userLoggedIn(user){
	var objectString = JSON.parse(user);

	if(objectString.accountType === "user"){
     	activeUser = new User(objectString.username, objectString.password);
    }else if(objectString.accountType === "moderator"){
     	activeUser = new Moderator(objectString.username, objectString.password);
    }else{
     	activeUser = new Admin(objectString.username, objectString.password);
    	$("#review-app-button").css("display","inline");
    }

	console.log("Logged in! Username: "+activeUser.username + " Credentials: "+activeUser.accountType);
	$("#login-button").css("display","none");
	$("#create-button").css("display","none");
	$("#signout-button").css("display","inline");
	$("#proposal-button").css("display","inline");	
	$("#welcome-user").html("Welcome "+activeUser.username+"!");


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



function listElements(list){
	var result = "";
	list.forEach(function(value){
		result = result + "<li>" + value + "</li>";
	});
	return result;
}

function getAppElement(app, key){
	var price;
	if(app.price != 0)
		price = "$" + app.price;
	else
		price = "Free!"

	var element = $('<li class="app-item">\
		<div class="top-block pure-g">\
			<h1 class="pure-u-1-3 title"><a href="appPage.html?key='+key+'">'+app.name+'</a></h1>\
		</div>\
		<div class="bottom-block pure-g">\
			<div class="pure-u-1-5 version"><p><b>Version</b></p>'+app.version+'</div>\
			<div class="pure-u-1-5 price"><p><b>Price:</b></p>'+price+'</div>\
			<div class="pure-u-1-5 devs"><p><b>Developers</b></p><ul>'+listElements(app.devs)+'</ul></div>\
			<div class="pure-u-1-5 plats"><p><b>Platforms</b></p><ul>'+listElements(app.platforms)+'</ul></div>\
			<div class="pure-u-1-5 link"><a href="'+app.link+'">Link</a></div>\
		</div>\
		</li>');

	return element;
}

//returns a string of an app proposal element to be added in reviewApp.html
function getAppProposalElement(app, key){
	var price;
	if(app.price != 0)
		price = "$" + app.price;
	else
		price = "Free!";

	var shortDesc;
	var readMore = false;
	if(app.desc.length > 75){
		shortDesc = app.desc.substring(0,75);
		readMore = true;
	}else{
		shortDesc = app.desc;
	}

	var element = '<li class="app-proposal-item app-item '+ key +'">';
	element += '<div class="top-block pure-g">';
	element += '<h1 class="pure-u-1-3 title">'+app.name+'</h1>';
	element += '<div class="accept-deny-buttons"><button class="accept-app">Accept</button><button class="deny-app">Deny</button></div>';
	element += '</div>';
	element += '<div class="bottom-block pure-g">';
	element += '<div class="pure-u-1-5 version"><p><b>Version</b></p>'+app.version+'</div>';
	element += '<div class="pure-u-1-5 price"><p><b>Price:</b></p>'+price+'</div>';
	element += '<div class="pure-u-1-5 devs"><p><b>Developers</b></p><ul>'+listElements(app.devs)+'</ul></div>';
	element += '<div class="pure-u-1-5 plats"><p><b>Platforms</b></p><ul>'+listElements(app.platforms)+'</ul></div>';
	element += '<div class="pure-u-1-5 link"><a href="'+app.link+'">Link</a></div>';
	element += '</div>';
	element += '<div class="proposal-desc"><p class="short-desc">'+ shortDesc;

	if(readMore) element += '<span class="read-more" style="color:gray;">...Read more</span>';


	element += '</p>';
	element += '<p class="full-desc" style="display:none;">'+ app.desc;
	element += '<span class="read-less" style="color:gray;">...Read less</span></p></div>';
	element += '</li>';	
	return element;
}





//make the search bar stick to the top when the page is scrolled so far
window.onscroll = function(){
	if(window.pageYOffset > $("header").height()){
		$("#search-bar").addClass("sticky-search-bar");
	}else{
		$("#search-bar").removeClass("sticky-search-bar");
	}
}

function search(){
	var searchString = $("#search-box").val();
	window.location.href = "searchResults.html?search="+searchString;
}

