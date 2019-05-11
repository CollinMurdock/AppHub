
var activeUser;
var MAX_COMMENT_TITLE_LENGTH = 75;
var MAX_COMMENT_BODY_LENGTH = 350;

//gets run before anything
$(document).ready(function(){

	initializeFirebase();

	//get user item from sessionStorage
	var user = sessionStorage.getItem("user");
	if(user !== null){
		userLoggedIn(user);
	}else{
		console.log("No one logged in");
	}
});

//called when a user is logged in
function userLoggedIn(user){
	//parse the JSON string into an object
	var object = JSON.parse(user);

	//decide what type the object is
	if(object.accountType === "user"){
     	activeUser = new User(object.username, object.password);
    }else if(object.accountType === "moderator"){
     	activeUser = new Moderator(object.username, object.password);
    }else{
		 activeUser = new Admin(object.username, object.password);
		 //show app-review-button
    	$("#app-review-button").css("display","inline");
    }

	//display or not display buttons
	console.log("Logged in! Username: "+activeUser.username + " Credentials: "+activeUser.accountType);
	$("#login-button").css("display","none");
	$("#create-button").css("display","none");
	$("#signout-button").css("display","inline");
	$("#proposal-button").css("display","inline");	
	$("#welcome-user").html("Welcome "+activeUser.username+"!");


}

//called when signing out
function signOut(){
	//remove user item from sessionStorage
	sessionStorage.removeItem("user");
	window.location.href = 'index.html';
	console.log("signed out");
}


//returns a string of an html element with the app's information
function getAppElement(app, key){
	var price;
	//if price is 0, display free!
	if(app.price != 0)
		price = "$" + app.price;
	else
		price = "Free!";

	var element = $('<li class="app-item">\
		<div class="top-block pure-g">\
			<h1 class="pure-u-1-3 title"><a href="appPage.html?key='+key+'">'+app.name+'</a></h1>\
		</div>\
		<div class="bottom-block pure-g">\
			<div class="pure-u-1-5 version"><p><b>Version</b></p>'+app.version+'</div>\
			<div class="pure-u-1-5 price"><p><b>Price:</b></p>'+price+'</div>\
			<div class="pure-u-1-5 devs"><p><b>Developers</b></p><ul>'+listElements(app.devs)+'</ul></div>\
			<div class="pure-u-1-5 plats"><p><b>Platforms</b></p><ul>'+listElements(app.platforms)+'</ul></div>\
			<div class="pure-u-1-6 category"><p><b>Category</b></p>'+app.category+'</div>\
			<div class="pure-u-1-5 link"><a href="'+app.link+'">Link</a></div>\
		</div>\
		</li>');

	return element;
}

//returns a string of an app proposal element to be added in reviewApp.html
function getAppProposalElement(app, key){
	var price;
	//if price is 0, display free!
	if(app.price != 0)
		price = "$" + app.price;
	else
		price = "Free!";

	//this will display a 'read more' link if the description is greater than 75 characters
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
	element += '<div class="pure-u-1-6 version"><p><b>Version</b></p>'+app.version+'</div>';
	element += '<div class="pure-u-1-6 price"><p><b>Price:</b></p>'+price+'</div>';
	element += '<div class="pure-u-1-6 devs"><p><b>Developers</b></p><ul>'+listElements(app.devs)+'</ul></div>';
	element += '<div class="pure-u-1-6 plats"><p><b>Platforms</b></p><ul>'+listElements(app.platforms)+'</ul></div>';
	element += '<div class="pure-u-1-6 category"><p><b>Category</b></p>'+app.category+'</div>';	
	element += '<div class="pure-u-1-6 link"><a href="'+app.link+'">Link</a></div>';
	element += '</div>';
	element += '<div class="proposal-desc"><p class="short-desc">'+ shortDesc;
	
	if(readMore) element += '<span class="read-more" style="color:gray;">...Read more</span>';
	
	element += '</p>';
	element += '<p class="full-desc" style="display:none;">'+ app.desc;
	element += '<span class="read-less" style="color:gray;">...Read less</span></p></div>';
	element += '</li>';	
	return element;
}


//returns a string of listed objects surrounded with <li> tags
function listElements(list){
	var result = "";
	list.forEach(function(value){
		result = result + "<li>" + value + "</li>";
	});
	return result;
}


//make the search bar stick to the top when the page is scrolled so far
window.onscroll = function(){
	if(window.pageYOffset > $("header").height()){
		$("#search-bar").addClass("sticky-search-bar");
	}else{
		$("#search-bar").removeClass("sticky-search-bar");
	}
}

//function that links to the search results page with the search query
function search(){
	var searchString = $("#search-box").val().trim();
	window.location.href = "searchResults.html?search="+searchString;
}

//function that reloads the page with the filter queries
function filter(){
	var selectVal = $("#order-select").val();
	var sortString = "";
	switch(selectVal){
		case "Alphabetical - Z to A":
			sortString = "ahigh";
			break;
		case "Price - A to Z":
			sortString = "plow";
			break;
		case "Price - High to Low":
			sortString = "phigh";
			break;
	}

	var categoryString = "";
	if(!($("#category-select").val() == "All")){
		categoryString= $("#category-select").val().replace(" ","+");
	}

	
	var url = window.location.href;
	if(url.indexOf("search") > -1){
		if(url.indexOf("&") > -1){
			url = url.substring(0,url.indexOf("&")) + "&sort="+sortString+"&cat="+categoryString;
		}else{
			url += "&sort="+sortString+"&cat="+categoryString;
		}
	}else{
		url = "index.html?sort="+sortString+"&cat="+categoryString;
	}
	window.location.href = url;
}



//filtering functions
function filterCategory(list, category){
	var result = [];
	list.forEach(function(item, index){
		if(item.category == category){
			result.push(item);
		}
	});
	return result;
}

//Used for testing purposes
//var convert = {};
//convert.filterCategory = filterCategory;
//module.exports = convert;


//sorting functions
function sortAlphabeticalHigh(a,b){
	let x = a.name.toUpperCase();
	let y = b.name.toUpperCase();
	return ((x > y) ? -1 : 1);
}
function sortAlphabeticalLow(a,b){
	let x = a.name.toUpperCase();
	let y = b.name.toUpperCase();
	return ((x < y) ? -1 : 1);
}

function sortPriceHigh(a,b){
	return ((a.price > b.price) ? -1 : 1);
}

function sortPriceLow(a,b){
	return ((a.price < b.price) ? -1 : 1);
}