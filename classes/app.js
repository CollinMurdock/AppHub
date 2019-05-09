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
				price, links, category){
  		this.name = name;
  		this.desc = desc;
  		this.devs = devs;
  		this.platforms = platforms;
  		this.version = version;
  		this.price = price;
  		this.links = links;
  		this.category = category;
  		this.comments = null;
 	}
	
	 getName(){
		return this.name;
	}
	
	 getDesc(){
		return this.desc;
	}
	
	 getDevs(){
		return this.devs;
	}
	
	 getPlatforms(){
		return this.platforms;
	}
	
	 getVersion() {
		return this.version;
	}
	
	 getPrice() {
		return this.price;
	}
	
	 getLink(){
		return this.link;
	}
	
	 getCategories(){
		return this.category;
	}
	
	getComments() {
		return this.comments;
	}
	
	 setName(name){
		this.name = name;
	}
	
	 setDesc(desc){
		this.desc = desc;
	}
	
	 setDevs(devs){
		this.devs = devs;
	}
	
	 setPlatforms(platforms){
		this.platforms = platforms;
	}
	
	 setVersion(version){
		this.version = version;
	}
	
	 setPrice(price){
		this.price = price;
	}
	
	 setLink(newLink){
		this.link = newLink;
	}
	
	 setCategories(categories){
		this.categories = categories;
	}
	
	setComments(comments){
		this.comments = comments;
	}
}


//module.exports = App;