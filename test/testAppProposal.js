//This is for testing the app proposal object
const expect = require('chai').expect;
const AppProposal = require('../classes/AppProposal');

describe('App Proposal Tests', function(){
	//will hold reference to the tested app proposal
	let appProposal;
	
	beforeEach(function(){
		let name = 'testName';
  		let desc = 'testDesc';
  		let devs = 'testDevs';
  		let platforms = 'testPlatforms';
  		let version = 'testVersion';
  		let price = 'testPrice';
  		let link = 'testLink';
  		let categories = 'testCategories';
		appProposal = new AppProposal(name, desc, devs, platforms, version, price, link, categories);
	});
	
	it('should be an object', function(done){
		expect(appProposal).to.be.a('object');
		done();
	});
	
	it('should have getter functions that return accurate values', function(done){
		expect(appProposal.getName()).to.equal('testName');
		expect(appProposal.getDesc()).to.equal('testDesc');
		expect(appProposal.getDevs()).to.equal('testDevs');
		expect(appProposal.getPlatforms()).to.equal('testPlatforms');
		expect(appProposal.getVersion()).to.equal('testVersion');
		expect(appProposal.getPrice()).to.equal('testPrice');
		expect(appProposal.getLink()).to.equal('testLink');
		expect(appProposal.getCategories()).to.equal('testCategories');
		done();
	});
		
})