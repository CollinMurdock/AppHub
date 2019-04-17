class AppItem{
	element;
	constructor(app, key){

		var price;
		if(app.price != 0)
			price = "$" + app.price;
		else
			price = "Free!"

		this.element = $('<li class="app-item">\
			<div class="top-block pure-g">\
				<h1 class="pure-u-1-3 title"><a href="appPage.html/?key="'+key+'">'+app.name+'</a></h1>\
			</div>\
			<div class="bottom-block pure-g">\
				<div class="pure-u-1-5 version"><p><b>Version</b></p>'+app.version+'</div>\
				<div class="pure-u-1-5 price"><p><b>Price:</b></p>'+price+'</div>\
				<div class="pure-u-1-5 devs"><p><b>Developers</b></p><ul>'+listElements(app.devs)+'</ul></div>\
				<div class="pure-u-1-5 plats"><p><b>Platforms</b></p><ul>'+listElements(app.platforms)+'</ul></div>\
				<div class="pure-u-1-5 link"><a href="'+app.link+'">Link</a></div>\
			</div>\
			</li>');	
		
	}
	
}
function listElements(list){
	var result = "";
	list.forEach(function(value){
		result = result + "<li>" + value + "</li>";
	});
	return result;
}
