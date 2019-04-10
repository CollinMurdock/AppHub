//This javascript file tests the functionality of the Moderator class

const expect = require('chai').expect;

const Moderator = require('../classes/moderator');
const User = require('../classes/user');

describe('Moderator Tests', function(){
	//The moderator object on which we will run the tests
	let moderator;
	
	beforeEach(function(){
		let username = 'testUsername';
		let password = 'testPassword';
		moderator = new Moderator(username, password);
	});
	
	it('should be an object', function(done){
		expect(moderator).to.be.a('object');
		done();
	});
	
	it('should be an instance of a user', function(done){
		expect(moderator).to.be.an.instanceOf(User);
		done();
	});
	
	it('should store initial values', function(done){
		expect(moderator.username).to.equal('testUsername');
		expect(moderator.password).to.equal('testPassword');
		expect(moderator.accountType).to.equal('moderator');
		done();
	});
});