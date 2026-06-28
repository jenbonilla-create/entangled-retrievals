import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Common "../types/common";
import BookingTypes "../types/booking";
import BookingLib "../lib/booking";
import UserLib "../lib/user";

mixin (
  users : Map.Map<Common.UserId, UserLib.User>,
  bookings : Map.Map<Common.BookingId, BookingLib.Booking>,
  nextBookingId : { var value : Nat },
  inventoryItems : Map.Map<Common.InventoryItemId, BookingLib.InventoryItem>,
  nextInventoryItemId : { var value : Nat },
  messages : Map.Map<Common.MessageId, BookingLib.Message>,
  nextMessageId : { var value : Nat },
  documents : Map.Map<Common.DocumentId, BookingLib.Document>,
  nextDocumentId : { var value : Nat },
  coordinatorLocations : Map.Map<Common.BookingId, BookingLib.CoordinatorLocation>,
) {
  public shared ({ caller }) func createBooking(
    retrievalType : BookingTypes.RetrievalType,
    pickupAddress : BookingTypes.Address,
    safetyAssessment : BookingTypes.SafetyAssessment,
    scheduledDate : Common.Timestamp,
    totalAmount : Nat,
  ) : async Common.Result<BookingLib.Booking, Common.ApiError> {
    let timestamp = 0;
    switch (UserLib.getUserProfile(users, caller)) {
      case (#ok(_)) {
        switch (BookingLib.createBooking(bookings, nextBookingId, caller, retrievalType, pickupAddress, safetyAssessment, scheduledDate, totalAmount, timestamp)) {
          case (#ok(booking)) { #ok(booking) };
          case (#err(e)) { #err(e) };
        };
      };
      case (#err(e)) { #err(e) };
    };
  };

  public shared query func getBooking(id : Common.BookingId) : async Common.Result<BookingLib.Booking, Common.ApiError> {
    switch (BookingLib.getBooking(bookings, id)) {
      case (?booking) { #ok(booking) };
      case null { #err(#notFound) };
    };
  };

  public shared query ({ caller }) func getMyBookings() : async Common.Result<[BookingLib.Booking], Common.ApiError> {
    switch (UserLib.getUserProfile(users, caller)) {
      case (#ok(_)) { #ok(BookingLib.getUserBookings(bookings, caller)) };
      case (#err(e)) { #err(e) };
    };
  };

  public shared ({ caller }) func updateBookingStatus(
    id : Common.BookingId,
    status : BookingTypes.RetrievalStatus,
  ) : async Common.Result<BookingLib.Booking, Common.ApiError> {
    let timestamp = 0;
    switch (UserLib.getUserProfile(users, caller)) {
      case (#ok(_)) {
        switch (BookingLib.updateBookingStatus(bookings, id, status, timestamp)) {
          case (?booking) { #ok(booking) };
          case null { #err(#notFound) };
        };
      };
      case (#err(e)) { #err(e) };
    };
  };

  public shared ({ caller }) func addInventoryItem(
    bookingId : Common.BookingId,
    name : Text,
    photoUrls : [Text],
    description : ?Text,
    estimatedValue : ?Nat,
    priority : BookingTypes.Priority,
  ) : async Common.Result<BookingLib.InventoryItem, Common.ApiError> {
    let timestamp = 0;
    switch (UserLib.getUserProfile(users, caller)) {
      case (#ok(_)) {
        switch (BookingLib.addInventoryItem(inventoryItems, nextInventoryItemId, bookingId, name, photoUrls, description, estimatedValue, priority, timestamp)) {
          case (#ok(item)) { #ok(item) };
          case (#err(e)) { #err(e) };
        };
      };
      case (#err(e)) { #err(e) };
    };
  };

  public shared query ({ caller }) func getInventoryItems(bookingId : Common.BookingId) : async Common.Result<[BookingLib.InventoryItem], Common.ApiError> {
    switch (UserLib.getUserProfile(users, caller)) {
      case (#ok(_)) { #ok(BookingLib.getInventoryItems(inventoryItems, bookingId)) };
      case (#err(e)) { #err(e) };
    };
  };

  public shared ({ caller }) func updateInventoryItem(
    id : Common.InventoryItemId,
    updates : {
      name : ?Text;
      photoUrls : ?[Text];
      description : ?Text;
      estimatedValue : ?Nat;
      priority : ?BookingTypes.Priority;
      condition : ?BookingTypes.ItemCondition;
      status : ?BookingTypes.ItemStatus;
      notes : ?Text;
    },
  ) : async Common.Result<BookingLib.InventoryItem, Common.ApiError> {
    let timestamp = 0;
    switch (UserLib.getUserProfile(users, caller)) {
      case (#ok(_)) {
        switch (BookingLib.updateInventoryItem(inventoryItems, id, updates, timestamp)) {
          case (?item) { #ok(item) };
          case null { #err(#notFound) };
        };
      };
      case (#err(e)) { #err(e) };
    };
  };

  public shared ({ caller }) func addMessage(
    bookingId : Common.BookingId,
    content : Text,
    attachments : [Text],
  ) : async Common.Result<BookingLib.Message, Common.ApiError> {
    let timestamp = 0;
    switch (UserLib.getUserProfile(users, caller)) {
      case (#ok(_)) {
        switch (BookingLib.addMessage(messages, nextMessageId, bookingId, caller, #customer, content, attachments, timestamp)) {
          case (#ok(message)) { #ok(message) };
          case (#err(e)) { #err(e) };
        };
      };
      case (#err(e)) { #err(e) };
    };
  };

  public shared query ({ caller }) func getMessages(bookingId : Common.BookingId) : async Common.Result<[BookingLib.Message], Common.ApiError> {
    switch (UserLib.getUserProfile(users, caller)) {
      case (#ok(_)) { #ok(BookingLib.getMessages(messages, bookingId)) };
      case (#err(e)) { #err(e) };
    };
  };

  public shared ({ caller }) func addDocument(
    bookingId : Common.BookingId,
    docType : BookingTypes.DocumentType,
    url : Text,
    name : Text,
  ) : async Common.Result<BookingLib.Document, Common.ApiError> {
    let timestamp = 0;
    switch (UserLib.getUserProfile(users, caller)) {
      case (#ok(_)) {
        switch (BookingLib.addDocument(documents, nextDocumentId, bookingId, docType, url, name, timestamp)) {
          case (#ok(doc)) { #ok(doc) };
          case (#err(e)) { #err(e) };
        };
      };
      case (#err(e)) { #err(e) };
    };
  };

  public shared query ({ caller }) func getDocuments(bookingId : Common.BookingId) : async Common.Result<[BookingLib.Document], Common.ApiError> {
    switch (UserLib.getUserProfile(users, caller)) {
      case (#ok(_)) { #ok(BookingLib.getDocuments(documents, bookingId)) };
      case (#err(e)) { #err(e) };
    };
  };

  public shared ({ caller }) func cancelBooking(
    id : Common.BookingId,
  ) : async Common.Result<BookingLib.Booking, Common.ApiError> {
    let timestamp = 0;
    switch (UserLib.getUserProfile(users, caller)) {
      case (#ok(profile)) {
        if (profile.role == #admin or profile.role == #staff) {
          switch (BookingLib.cancelBooking(bookings, id, timestamp)) {
            case (?booking) { #ok(booking) };
            case null { #err(#notFound) };
          };
        } else {
          #err(#unauthorized);
        };
      };
      case (#err(e)) { #err(e) };
    };
  };

  public shared query ({ caller }) func listBookings() : async Common.Result<[BookingLib.Booking], Common.ApiError> {
    switch (UserLib.getUserProfile(users, caller)) {
      case (#ok(profile)) {
        if (profile.role == #admin or profile.role == #staff) {
          #ok(BookingLib.listBookings(bookings));
        } else {
          #err(#unauthorized);
        };
      };
      case (#err(e)) { #err(e) };
    };
  };

  public shared ({ caller }) func updateCoordinatorLocation(
    bookingId : Common.BookingId,
    location : Common.Location,
  ) : async Common.Result<BookingLib.CoordinatorLocation, Common.ApiError> {
    let timestamp = 0;
    switch (UserLib.getUserProfile(users, caller)) {
      case (#ok(_)) {
        let loc = BookingLib.updateCoordinatorLocation(coordinatorLocations, bookingId, location, timestamp);
        #ok(loc);
      };
      case (#err(e)) { #err(e) };
    };
  };

  public shared query ({ caller }) func getCoordinatorLocation(bookingId : Common.BookingId) : async Common.Result<BookingLib.CoordinatorLocation, Common.ApiError> {
    switch (UserLib.getUserProfile(users, caller)) {
      case (#ok(_)) {
        switch (BookingLib.getCoordinatorLocation(coordinatorLocations, bookingId)) {
          case (?loc) { #ok(loc) };
          case null { #err(#notFound) };
        };
      };
      case (#err(e)) { #err(e) };
    };
  };
};
