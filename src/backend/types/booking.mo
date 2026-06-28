import Common "common";

module {
  public type RetrievalType = {
    #breakup;
    #separation;
    #roommate;
    #familyConflict;
    #emergency;
    #storage;
    #propertyExchange;
  };

  public type RetrievalStatus = {
    #requestReceived;
    #reviewing;
    #coordinatorAssigned;
    #traveling;
    #arrived;
    #inProgress;
    #documentationComplete;
    #finished;
    #closed;
  };

  public type PaymentStatus = {
    #pending;
    #paid;
    #failed;
    #refunded;
  };

  public type Priority = {
    #low;
    #medium;
    #high;
    #critical;
  };

  public type ItemCondition = {
    #excellent;
    #good;
    #fair;
    #poor;
    #damaged;
  };

  public type ItemStatus = {
    #pending;
    #retrieved;
    #notRetrieved;
    #damaged;
    #disputed;
  };

  public type Address = {
    street : Text;
    unit : ?Text;
    city : Text;
    state : Text;
    zip : Text;
    gateCode : ?Text;
    specialInstructions : ?Text;
  };

  public type SafetyAssessment = {
    historyOfConflict : Bool;
    restrainingOrder : Bool;
    policeInvolvement : Bool;
    weaponsConcern : Bool;
    potentialThreats : Bool;
    childrenPresent : Bool;
    petsPresent : Bool;
    notes : ?Text;
  };

  public type Booking = {
    id : Common.BookingId;
    userId : Common.UserId;
    retrievalType : RetrievalType;
    pickupAddress : Address;
    safetyAssessment : SafetyAssessment;
    scheduledDate : Common.Timestamp;
    status : RetrievalStatus;
    paymentStatus : PaymentStatus;
    totalAmount : Nat;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type InventoryItem = {
    id : Common.InventoryItemId;
    bookingId : Common.BookingId;
    name : Text;
    photoUrls : [Text];
    description : ?Text;
    estimatedValue : ?Nat;
    priority : Priority;
    condition : ItemCondition;
    status : ItemStatus;
    notes : ?Text;
    createdAt : Common.Timestamp;
  };

  public type Message = {
    id : Common.MessageId;
    bookingId : Common.BookingId;
    senderId : Common.UserId;
    senderRole : Common.Role;
    content : Text;
    attachments : [Text];
    createdAt : Common.Timestamp;
  };

  public type DocumentType = {
    #photo;
    #video;
    #pdf;
    #receipt;
    #signature;
    #report;
    #other;
  };

  public type Document = {
    id : Common.DocumentId;
    bookingId : Common.BookingId;
    docType : DocumentType;
    url : Text;
    name : Text;
    createdAt : Common.Timestamp;
  };

  public type CoordinatorLocation = {
    bookingId : Common.BookingId;
    location : Common.Location;
    updatedAt : Common.Timestamp;
  };
};
