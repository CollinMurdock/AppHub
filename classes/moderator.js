//const User = require('./user');
class Moderator extends User{
	constructor(username, password){
		super(username, password);
		this.accountType = 'moderator';
	}

	deleteComment(key){
		
	}
}

module.exports = Moderator;