import Map "mo:core/Map";
import Principal "mo:core/Principal";
import MixinViews "mo:caffeineai-data-viewer/MixinViews";
import Common "types/common";
import UserTypes "types/user";
import BookingTypes "types/booking";
import UserLib "lib/user";
import BookingLib "lib/booking";
import UserApi "mixins/user-api";
import BookingApi "mixins/booking-api";

actor {
  let users : Map.Map<Common.UserId, UserTypes.User>;
  let nextUserId : { var value : Nat };
  let bookings : Map.Map<Common.BookingId, BookingTypes.Booking>;
  let nextBookingId : { var value : Nat };
  let inventoryItems : Map.Map<Common.InventoryItemId, BookingTypes.InventoryItem>;
  let nextInventoryItemId : { var value : Nat };
  let messages : Map.Map<Common.MessageId, BookingTypes.Message>;
  let nextMessageId : { var value : Nat };
  let documents : Map.Map<Common.DocumentId, BookingTypes.Document>;
  let nextDocumentId : { var value : Nat };
  let coordinatorLocations : Map.Map<Common.BookingId, BookingTypes.CoordinatorLocation>;

  include UserApi(users, nextUserId);
  include BookingApi(users, bookings, nextBookingId, inventoryItems, nextInventoryItemId, messages, nextMessageId, documents, nextDocumentId, coordinatorLocations);
  include MixinViews();
};
