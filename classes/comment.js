class Comment {

	
	//constructor
	constructor(user, title, body){
		this.user = user;
    	this.title = title;
		this.body = body;
  	}

  	getHTML(){
		let element = $('<li class="comment">\
			<div class="top-block">\
				<h2 style="display:inline;">'+ this.title +'</h2>\
				<span style="color:grey;"> from </span>\
				<span>'+ this.user.username +'</span>\
			</div>\
			<div class="bottom-block">\
				<p>'+ this.body +'</p>\
			</div>\
			</li>');

		return element;
	}
}

