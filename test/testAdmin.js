//This javascript file tests the funcitonality of the admin classconst expect = require('chai').expect;


const expect = require('chai').expect;

const Admin = require('../classes/admin');
const Moderator = require('../classes/moderator');

describe('Admin Tests', function(){
	//The admin object on which we will run the tests
	let admin;
	
	beforeEach(function(){
		let username = 'testUsername';
		let password = 'testPassword';
		admin = new Admin(username, password);
	});
	
	it('should be an object', function(done){
		expect(admin).to.be.a('object');
		done();
	});
	
	it('should be an instance of a user', function(done){
		expect(admin).to.be.an.instanceOf(Moderator);
		done();
	});
	
	it('should store initial values', function(done){
		expect(admin.username).to.equal('testUsername');
		expect(admin.password).to.equal('testPassword');
		expect(admin.accountType).to.equal('admin');
		done();
	});
});