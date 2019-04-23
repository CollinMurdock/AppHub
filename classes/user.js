class User {

	//constructor
	constructor(username, password){
		this.setUsername(username);
		this.setPassword(password);
		this.accountType = 'user'
  }
  
  getUsername(){
	  return this.username;
  }
  
  getPassword(){
	return this.password;
  }
  
  setPassword(newPassword){
	  if(newPassword.length >= 5)
		this.password = newPassword;
  }
  
  setUsername(newUsername){
	  if(newUsername !== '')
		this.username = newUsername;
  }
}

module.exports = User;