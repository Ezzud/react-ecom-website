class User {
    constructor(id, firstName, lastName, email, passwordHash, isAdmin) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.passwordHash = passwordHash;
      this.isAdmin = isAdmin;
    }
  
    static fromJSON(json) {
      return new User(
        json.id,
        json.firstName,
        json.lastName,
        json.email,
        json.passwordHash,
        json.isAdmin
      );
    }
  }
  
export default User;