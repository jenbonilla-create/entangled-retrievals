import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  type OldActor = {};

  type NewActor = {
    var users : Map.Map<Principal, {
      id : Principal;
      email : Text;
      passwordHash : Text;
      firstName : Text;
      lastName : Text;
      phone : Text;
      role : { #customer; #staff; #admin };
      createdAt : Nat;
    }>;
    var nextUserId : { var value : Nat };
    var bookings : Map.Map<Nat, {
      id : Nat;
      userId : Principal;
      retrievalType : { #breakup; #separation; #roommate; #familyConflict; #emergency; #storage; #propertyExchange };
      pickupAddress : {
        street : Text;
        unit : ?Text;
        city : Text;
        state : Text;
        zip : Text;
        gateCode : ?Text;
        specialInstructions : ?Text;
      };
      safetyAssessment : {
        historyOfConflict : Bool;
        restrainingOrder : Bool;
        policeInvolvement : Bool;
        weaponsConcern : Bool;
        potentialThreats : Bool;
        childrenPresent : Bool;
        petsPresent : Bool;
        notes : ?Text;
      };
      scheduledDate : Nat;
      status : { #requestReceived; #reviewing; #coordinatorAssigned; #traveling; #arrived; #inProgress; #documentationComplete; #finished; #closed };
      paymentStatus : { #pending; #paid; #failed; #refunded };
      totalAmount : Nat;
      createdAt : Nat;
      updatedAt : Nat;
    }>;
    var nextBookingId : { var value : Nat };
    var inventoryItems : Map.Map<Nat, {
      id : Nat;
      bookingId : Nat;
      name : Text;
      photoUrls : [Text];
      description : ?Text;
      estimatedValue : ?Nat;
      priority : { #low; #medium; #high; #critical };
      condition : { #excellent; #good; #fair; #poor; #damaged };
      status : { #pending; #retrieved; #notRetrieved; #damaged; #disputed };
      notes : ?Text;
      createdAt : Nat;
    }>;
    var nextInventoryItemId : { var value : Nat };
    var messages : Map.Map<Nat, {
      id : Nat;
      bookingId : Nat;
      senderId : Principal;
      senderRole : { #customer; #staff; #admin };
      content : Text;
      attachments : [Text];
      createdAt : Nat;
    }>;
    var nextMessageId : { var value : Nat };
    var documents : Map.Map<Nat, {
      id : Nat;
      bookingId : Nat;
      docType : { #photo; #video; #pdf; #receipt; #signature; #report; #other };
      url : Text;
      name : Text;
      createdAt : Nat;
    }>;
    var nextDocumentId : { var value : Nat };
    var coordinatorLocations : Map.Map<Nat, {
      bookingId : Nat;
      location : { lat : Float; lng : Float };
      updatedAt : Nat;
    }>;
  };

  public func migration(old : OldActor) : NewActor {
    {
      var users = Map.empty<Principal, {
        id : Principal;
        email : Text;
        passwordHash : Text;
        firstName : Text;
        lastName : Text;
        phone : Text;
        role : { #customer; #staff; #admin };
        createdAt : Nat;
      }>();
      var nextUserId = { var value = 0 };
      var bookings = Map.empty<Nat, {
        id : Nat;
        userId : Principal;
        retrievalType : { #breakup; #separation; #roommate; #familyConflict; #emergency; #storage; #propertyExchange };
        pickupAddress : {
          street : Text;
          unit : ?Text;
          city : Text;
          state : Text;
          zip : Text;
          gateCode : ?Text;
          specialInstructions : ?Text;
        };
        safetyAssessment : {
          historyOfConflict : Bool;
          restrainingOrder : Bool;
          policeInvolvement : Bool;
          weaponsConcern : Bool;
          potentialThreats : Bool;
          childrenPresent : Bool;
          petsPresent : Bool;
          notes : ?Text;
        };
        scheduledDate : Nat;
        status : { #requestReceived; #reviewing; #coordinatorAssigned; #traveling; #arrived; #inProgress; #documentationComplete; #finished; #closed };
        paymentStatus : { #pending; #paid; #failed; #refunded };
        totalAmount : Nat;
        createdAt : Nat;
        updatedAt : Nat;
      }>();
      var nextBookingId = { var value = 0 };
      var inventoryItems = Map.empty<Nat, {
        id : Nat;
        bookingId : Nat;
        name : Text;
        photoUrls : [Text];
        description : ?Text;
        estimatedValue : ?Nat;
        priority : { #low; #medium; #high; #critical };
        condition : { #excellent; #good; #fair; #poor; #damaged };
        status : { #pending; #retrieved; #notRetrieved; #damaged; #disputed };
        notes : ?Text;
        createdAt : Nat;
      }>();
      var nextInventoryItemId = { var value = 0 };
      var messages = Map.empty<Nat, {
        id : Nat;
        bookingId : Nat;
        senderId : Principal;
        senderRole : { #customer; #staff; #admin };
        content : Text;
        attachments : [Text];
        createdAt : Nat;
      }>();
      var nextMessageId = { var value = 0 };
      var documents = Map.empty<Nat, {
        id : Nat;
        bookingId : Nat;
        docType : { #photo; #video; #pdf; #receipt; #signature; #report; #other };
        url : Text;
        name : Text;
        createdAt : Nat;
      }>();
      var nextDocumentId = { var value = 0 };
      var coordinatorLocations = Map.empty<Nat, {
        bookingId : Nat;
        location : { lat : Float; lng : Float };
        updatedAt : Nat;
      }>();
    };
  };
};
