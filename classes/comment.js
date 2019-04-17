class Comment {

	MAX_TITLE_LENGTH = 75;
	MAX_BODY_LENGTH = 350;
	//constructor
	constructor(username, title, body){
		this.username = username;
    	this.title = title;
		this.body = body;
  	}

  	getHTML(){
		let element = $('<li class="comment">\
			<div class="top-block">\
				<h2 style="display:inline;">'+ this.title +'</h2>\
				<span style="color:grey;"> from </span>\
				<span>'+ this.username +'</span>\
			</div>\
			<div class="bottom-block">\
				<p>'+ this.body +'</p>\
			</div>\
			</li>');

		return element;
	}
}

