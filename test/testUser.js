//This javascript file test the funcitonality of the User class.

const expect = require('chai').expect;

const User = require('../classes/user');

describe('User Tests', function(){
	//will hold reference to the tested user
	let user;
	
	beforeEach(function(){
		let username = 'testUsername';
		let password = 'testPassword';
		user = new User(username, password);
	});
	
	it('should be an object', function(done){
		expect(user).to.be.a('object');
		done();
	});
	
	it('should properly store initial values', function(done){
		expect(user.username).to.equal('testUsername');
		expect(user.username).to.be.a('string');
		expect(user.password).to.equal('testPassword');
		expect(user.password).to.be.a('string');
		done();
	});
	
	it('should automatically make the account a user account', function(done){
		expect(user.accountType).to.equal('user');
		expect(user.accountType).to.be.a('string');
		done();
	});
})