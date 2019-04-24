class App{

	//name; // String : name of the app
	//desc; // String : description
	//devs; // array<string> : list of developers
	//platforms; // array<string> : list of available platforms
	//version; // string : the current version
	//price; // double : the price
	//link; // array<string> : links to app stores
	//categories; // array<categories> : categories applied
	//comments; // array<Comment> : comments

	constructor(name, desc, devs, 
				platforms, version, 
				price, link, categories){
  		this.name = name;
  		this.desc = desc;
  		this.devs = devs;
  		this.platforms = platforms;
  		this.version = version;
  		this.price = price;
  		this.link = link;
  		this.categories = categories;
  		this.comments = null;
 	}
}


module.exports = App;