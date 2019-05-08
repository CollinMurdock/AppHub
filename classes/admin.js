//const Moderator = require('./moderator');

class Admin extends Moderator {
	constructor(username, password){
		super(username, password);
		this.accountType = 'admin';
	}
}

//module.exports = Admin;