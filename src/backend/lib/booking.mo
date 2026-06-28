import Debug "mo:core/Debug";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import BookingTypes "../types/booking";

module {
  public type Booking = BookingTypes.Booking;
  public type InventoryItem = BookingTypes.InventoryItem;
  public type Message = BookingTypes.Message;
  public type Document = BookingTypes.Document;
  public type CoordinatorLocation = BookingTypes.CoordinatorLocation;
  public type RetrievalStatus = BookingTypes.RetrievalStatus;
  public type Address = BookingTypes.Address;
  public type SafetyAssessment = BookingTypes.SafetyAssessment;

  public func validateAddress(address : Address) : Bool {
    address.street.size() > 0
    and address.city.size() > 0
    and address.state.size() > 0
    and address.zip.size() > 0
  };

  public func validateSafetyAssessment(assessment : SafetyAssessment) : Bool {
    true
  };

  public func validateBookingInput(
    retrievalType : BookingTypes.RetrievalType,
    pickupAddress : Address,
    safetyAssessment : SafetyAssessment,
    scheduledDate : Common.Timestamp,
    totalAmount : Nat,
  ) : ?Common.ApiError {
    if (not validateAddress(pickupAddress)) {
      return ?#badRequest("Pickup address must include street, city, state, and zip");
    };
    if (not validateSafetyAssessment(safetyAssessment)) {
      return ?#badRequest("Invalid safety assessment");
    };
    if (scheduledDate == 0) {
      return ?#badRequest("Scheduled date is required");
    };
    if (totalAmount == 0) {
      return ?#badRequest("Total amount must be greater than zero");
    };
    null;
  };

  public func createBooking(
    bookings : Map.Map<Common.BookingId, Booking>,
    nextBookingId : { var value : Nat },
    userId : Common.UserId,
    retrievalType : BookingTypes.RetrievalType,
    pickupAddress : Address,
    safetyAssessment : SafetyAssessment,
    scheduledDate : Common.Timestamp,
    totalAmount : Nat,
    timestamp : Common.Timestamp,
  ) : Common.Result<Booking, Common.ApiError> {
    switch (validateBookingInput(retrievalType, pickupAddress, safetyAssessment, scheduledDate, totalAmount)) {
      case (?err) { return #err(err) };
      case null {};
    };
    let id = nextBookingId.value;
    nextBookingId.value += 1;
    let booking : Booking = {
      id;
      userId;
      retrievalType;
      pickupAddress;
      safetyAssessment;
      scheduledDate;
      status = #requestReceived;
      paymentStatus = #pending;
      totalAmount;
      createdAt = timestamp;
      updatedAt = timestamp;
    };
    bookings.add(id, booking);
    #ok(booking);
  };

  public func getBooking(
    bookings : Map.Map<Common.BookingId, Booking>,
    id : Common.BookingId,
  ) : ?Booking {
    bookings.get(id);
  };

  public func getUserBookings(
    bookings : Map.Map<Common.BookingId, Booking>,
    userId : Common.UserId,
  ) : [Booking] {
    let filtered = bookings.entries().filter(func((_id, b)) { b.userId == userId });
    filtered.map<(Common.BookingId, Booking), Booking>(func((_id, b)) { b }).toArray()
  };

  public func updateBookingStatus(
    bookings : Map.Map<Common.BookingId, Booking>,
    id : Common.BookingId,
    status : RetrievalStatus,
    timestamp : Common.Timestamp,
  ) : ?Booking {
    switch (bookings.get(id)) {
      case (?booking) {
        let updated = { booking with status; updatedAt = timestamp };
        bookings.add(id, updated);
        ?updated;
      };
      case null { null };
    };
  };

  public func addInventoryItem(
    items : Map.Map<Common.InventoryItemId, InventoryItem>,
    nextItemId : { var value : Nat },
    bookingId : Common.BookingId,
    name : Text,
    photoUrls : [Text],
    description : ?Text,
    estimatedValue : ?Nat,
    priority : BookingTypes.Priority,
    timestamp : Common.Timestamp,
  ) : Common.Result<InventoryItem, Common.ApiError> {
    if (name.size() == 0) {
      return #err(#badRequest("Item name is required"));
    };
    let id = nextItemId.value;
    nextItemId.value += 1;
    let item : InventoryItem = {
      id;
      bookingId;
      name;
      photoUrls;
      description;
      estimatedValue;
      priority;
      condition = #excellent;
      status = #pending;
      notes = null;
      createdAt = timestamp;
    };
    items.add(id, item);
    #ok(item);
  };

  public func getInventoryItems(
    items : Map.Map<Common.InventoryItemId, InventoryItem>,
    bookingId : Common.BookingId,
  ) : [InventoryItem] {
    let filtered = items.entries().filter(func((_id, item)) { item.bookingId == bookingId });
    filtered.map<(Common.InventoryItemId, InventoryItem), InventoryItem>(func((_id, item)) { item }).toArray()
  };

  public func updateInventoryItem(
    items : Map.Map<Common.InventoryItemId, InventoryItem>,
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
    timestamp : Common.Timestamp,
  ) : ?InventoryItem {
    switch (items.get(id)) {
      case (?item) {
        let updated : InventoryItem = {
          item with
          name = switch (updates.name) { case (?v) v; case null item.name };
          photoUrls = switch (updates.photoUrls) { case (?v) v; case null item.photoUrls };
          description = switch (updates.description) { case (?v) ?v; case null item.description };
          estimatedValue = switch (updates.estimatedValue) { case (?v) ?v; case null item.estimatedValue };
          priority = switch (updates.priority) { case (?v) v; case null item.priority };
          condition = switch (updates.condition) { case (?v) v; case null item.condition };
          status = switch (updates.status) { case (?v) v; case null item.status };
          notes = switch (updates.notes) { case (?v) ?v; case null item.notes };
        };
        items.add(id, updated);
        ?updated;
      };
      case null { null };
    };
  };

  public func addMessage(
    messages : Map.Map<Common.MessageId, Message>,
    nextMessageId : { var value : Nat },
    bookingId : Common.BookingId,
    senderId : Common.UserId,
    senderRole : Common.Role,
    content : Text,
    attachments : [Text],
    timestamp : Common.Timestamp,
  ) : Common.Result<Message, Common.ApiError> {
    if (content.size() == 0) {
      return #err(#badRequest("Message content is required"));
    };
    let id = nextMessageId.value;
    nextMessageId.value += 1;
    let message : Message = {
      id;
      bookingId;
      senderId;
      senderRole;
      content;
      attachments;
      createdAt = timestamp;
    };
    messages.add(id, message);
    #ok(message);
  };

  public func getMessages(
    messages : Map.Map<Common.MessageId, Message>,
    bookingId : Common.BookingId,
  ) : [Message] {
    let filtered = messages.entries().filter(func((_id, m)) { m.bookingId == bookingId });
    filtered.map<(Common.MessageId, Message), Message>(func((_id, m)) { m }).toArray()
  };

  public func addDocument(
    documents : Map.Map<Common.DocumentId, Document>,
    nextDocumentId : { var value : Nat },
    bookingId : Common.BookingId,
    docType : BookingTypes.DocumentType,
    url : Text,
    name : Text,
    timestamp : Common.Timestamp,
  ) : Common.Result<Document, Common.ApiError> {
    if (url.size() == 0) {
      return #err(#badRequest("Document URL is required"));
    };
    if (name.size() == 0) {
      return #err(#badRequest("Document name is required"));
    };
    let id = nextDocumentId.value;
    nextDocumentId.value += 1;
    let doc : Document = {
      id;
      bookingId;
      docType;
      url;
      name;
      createdAt = timestamp;
    };
    documents.add(id, doc);
    #ok(doc);
  };

  public func getDocuments(
    documents : Map.Map<Common.DocumentId, Document>,
    bookingId : Common.BookingId,
  ) : [Document] {
    let filtered = documents.entries().filter(func((_id, d)) { d.bookingId == bookingId });
    filtered.map<(Common.DocumentId, Document), Document>(func((_id, d)) { d }).toArray()
  };

  public func updateCoordinatorLocation(
    locations : Map.Map<Common.BookingId, CoordinatorLocation>,
    bookingId : Common.BookingId,
    location : Common.Location,
    timestamp : Common.Timestamp,
  ) : CoordinatorLocation {
    let loc : CoordinatorLocation = {
      bookingId;
      location;
      updatedAt = timestamp;
    };
    locations.add(bookingId, loc);
    loc;
  };

  public func cancelBooking(
    bookings : Map.Map<Common.BookingId, Booking>,
    id : Common.BookingId,
    timestamp : Common.Timestamp,
  ) : ?Booking {
    switch (bookings.get(id)) {
      case (?booking) {
        let updated = { booking with status = #closed; updatedAt = timestamp };
        bookings.add(id, updated);
        ?updated;
      };
      case null { null };
    };
  };

  public func listBookings(
    bookings : Map.Map<Common.BookingId, Booking>,
  ) : [Booking] {
    bookings.entries().map<(Common.BookingId, Booking), Booking>(func((_id, b)) { b }).toArray()
  };

  public func getCoordinatorLocation(
    locations : Map.Map<Common.BookingId, CoordinatorLocation>,
    bookingId : Common.BookingId,
  ) : ?CoordinatorLocation {
    locations.get(bookingId);
  };
};
