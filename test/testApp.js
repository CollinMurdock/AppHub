//This javascript file test the funcitonality of the App class.

const expect = require('chai').expect;

const App = require('../classes/app');

describe('App Tests', function(){
	//will hold reference to the tested app
	let app;
	
	beforeEach(function(){
		let name = 'testName';
  		let desc = 'testDesc';
  		let devs = 'testDevs';
  		let platforms = 'testPlatforms';
  		let version = 'testVersion';
  		let price = 'testPrice';
  		let link = 'testLink';
  		let categories = 'testCategories';
  		let comments = 'testComments';
		app = new App(desc, devs, platforms, version, price, link, categories, comments);
	});
	
	it('should be an object', function(done){
		expect(app).to.be.a('object');
		done();
	});
	
	it('should have getter functions that return accurate values', function(done){
		expect(app.getName()).to.equal('testName');
		expect(app.getDesc()).to.equal('testDesc');
		expect(app.getDevs()).to.equal('testDevs');
		expect(app.getPlatforms()).to.equal('testPlatforms');
		expect(app.getVersion()).to.equal('testVersion');
		expect(app.getPrice()).to.equal('testPrice');
		expect(app.getLink()).to.equal('testLink');
		expect(app.getCategories()).to.equal('testCategories');
		expect(app.getComments()).to.equal('testComments');
		done();
	});
		
})