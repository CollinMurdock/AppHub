class User {

	//constructor
	constructor(username, password){
		this.username = username;
    	this.password = password;
		this.accountType = 'user'
  }
}

module.exports = User;