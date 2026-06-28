import Debug "mo:core/Debug";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import List "mo:core/List";
import Common "../types/common";
import UserTypes "../types/user";

module {
  public type User = UserTypes.User;
  public type RegisterInput = UserTypes.RegisterInput;
  public type LoginInput = UserTypes.LoginInput;
  public type UserProfile = UserTypes.UserProfile;

  public func registerUser(
    users : Map.Map<Common.UserId, User>,
    id : Common.UserId,
    input : RegisterInput,
    timestamp : Common.Timestamp,
  ) : Common.Result<User, Common.ApiError> {
    switch (users.get(id)) {
      case (?_) { #err(#badRequest("User already exists")) };
      case null {
        let user : User = {
          id;
          email = input.email;
          passwordHash = hashPassword(input.password);
          firstName = input.firstName;
          lastName = input.lastName;
          phone = input.phone;
          role = #customer;
          createdAt = timestamp;
        };
        users.add(id, user);
        #ok(user);
      };
    };
  };

  public func loginUser(
    users : Map.Map<Common.UserId, User>,
    input : LoginInput,
  ) : Common.Result<User, Common.ApiError> {
    let found = users.entries().find(func((_id, user)) { user.email == input.email });
    switch (found) {
      case (?(_id, user)) {
        if (verifyPassword(input.password, user.passwordHash)) {
          #ok(user);
        } else {
          #err(#unauthorized);
        };
      };
      case null { #err(#unauthorized) };
    };
  };

  public func getUserProfile(
    users : Map.Map<Common.UserId, User>,
    id : Common.UserId,
  ) : Common.Result<UserProfile, Common.ApiError> {
    switch (users.get(id)) {
      case (?user) { #ok(toProfile(user)) };
      case null { #err(#notFound) };
    };
  };

  public func toProfile(user : User) : UserProfile {
    {
      id = user.id;
      email = user.email;
      firstName = user.firstName;
      lastName = user.lastName;
      phone = user.phone;
      role = user.role;
      createdAt = user.createdAt;
    };
  };

  public func hashPassword(password : Text) : Text {
    let salted = "er_salt_" # password # "_v1";
    salted;
  };

  public func verifyPassword(password : Text, hash : Text) : Bool {
    hashPassword(password) == hash;
  };
};
