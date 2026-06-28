import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Common "../types/common";
import UserTypes "../types/user";
import UserLib "../lib/user";

mixin (
  users : Map.Map<Common.UserId, UserLib.User>,
  nextUserId : { var value : Nat },
) {
  public shared ({ caller }) func registerUser(input : UserTypes.RegisterInput) : async Common.Result<UserTypes.UserProfile, Common.ApiError> {
    let timestamp = 0;
    switch (UserLib.registerUser(users, caller, input, timestamp)) {
      case (#ok(user)) { #ok(UserLib.toProfile(user)) };
      case (#err(e)) { #err(e) };
    };
  };

  public shared ({ caller }) func loginUser(input : UserTypes.LoginInput) : async Common.Result<UserTypes.UserProfile, Common.ApiError> {
    switch (UserLib.loginUser(users, input)) {
      case (#ok(user)) { #ok(UserLib.toProfile(user)) };
      case (#err(e)) { #err(e) };
    };
  };

  public shared query ({ caller }) func getUserProfile() : async Common.Result<UserTypes.UserProfile, Common.ApiError> {
    switch (UserLib.getUserProfile(users, caller)) {
      case (#ok(profile)) { #ok(profile) };
      case (#err(e)) { #err(e) };
    };
  };
};
