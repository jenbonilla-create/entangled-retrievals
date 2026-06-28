import Principal "mo:core/Principal";

module {
  public type UserId = Principal;
  public type BookingId = Nat;
  public type InventoryItemId = Nat;
  public type MessageId = Nat;
  public type DocumentId = Nat;
  public type Timestamp = Nat;

  public type Role = {
    #customer;
    #staff;
    #admin;
  };

  public type Result<T, E> = {
    #ok : T;
    #err : E;
  };

  public type ApiError = {
    #notFound;
    #unauthorized;
    #badRequest : Text;
    #internalError : Text;
  };

  public type Location = {
    lat : Float;
    lng : Float;
  };
};
