const expect = require('chai').expect;
const convert = require('../js/session');
const App = require('../classes/App');

describe('App Filter Tests', function(){
	//will hold reference to the tested apps list
	let appsList;
	
	beforeEach(function(){
		appsList = [];
		appsList.push(new App('1','','','','','','','test'));
		appsList.push(new App('2','','','','','','','test'));
		appsList.push(new App('3','','','','','','','test2'));
	});
	
	it('should return two apps with category \'test\'', function(done){
		expect(convert.filterCategory(appsList, 'test').length).to.equal(2);
		done();
	});
	
	it('should return one app with category \'test2\'', function(done){
		expect(convert.filterCategory(appsList, 'test2').length).to.equal(1);
		done();
	});
		
})
