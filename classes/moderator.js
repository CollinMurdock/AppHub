//const User = require('./user');
class Moderator extends User{
	constructor(username, password){
		super(username, password);
		this.accountType = 'moderator';
	}
}

module.exports = Moderator;