import Common "common";

module {
  public type User = {
    id : Common.UserId;
    email : Text;
    passwordHash : Text;
    firstName : Text;
    lastName : Text;
    phone : Text;
    role : Common.Role;
    createdAt : Common.Timestamp;
  };

  public type RegisterInput = {
    email : Text;
    password : Text;
    firstName : Text;
    lastName : Text;
    phone : Text;
  };

  public type LoginInput = {
    email : Text;
    password : Text;
  };

  public type UserProfile = {
    id : Common.UserId;
    email : Text;
    firstName : Text;
    lastName : Text;
    phone : Text;
    role : Common.Role;
    createdAt : Common.Timestamp;
  };
};
