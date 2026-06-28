import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Location {
    lat: number;
    lng: number;
}
export type Timestamp = bigint;
export type Result_2 = {
    __kind__: "ok";
    ok: Booking;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface Document {
    id: DocumentId;
    url: string;
    bookingId: BookingId;
    name: string;
    createdAt: Timestamp;
    docType: DocumentType;
}
export type Result_5 = {
    __kind__: "ok";
    ok: Array<Message>;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_1 = {
    __kind__: "ok";
    ok: CoordinatorLocation;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_4 = {
    __kind__: "ok";
    ok: Array<Booking>;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface InventoryItem {
    id: InventoryItemId;
    status: ItemStatus;
    photoUrls: Array<string>;
    bookingId: BookingId;
    name: string;
    createdAt: Timestamp;
    description?: string;
    notes?: string;
    estimatedValue?: bigint;
    priority: Priority;
    condition: ItemCondition;
}
export type DocumentId = bigint;
export interface RegisterInput {
    password: string;
    email: string;
    phone: string;
    lastName: string;
    firstName: string;
}
export type Result_7 = {
    __kind__: "ok";
    ok: Array<Document>;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface Booking {
    id: BookingId;
    status: RetrievalStatus;
    paymentStatus: PaymentStatus;
    scheduledDate: Timestamp;
    userId: UserId;
    createdAt: Timestamp;
    retrievalType: RetrievalType;
    updatedAt: Timestamp;
    pickupAddress: Address;
    totalAmount: bigint;
    safetyAssessment: SafetyAssessment;
}
export interface LoginInput {
    password: string;
    email: string;
}
export type BookingId = bigint;
export interface CoordinatorLocation {
    bookingId: BookingId;
    updatedAt: Timestamp;
    location: Location;
}
export type Result_6 = {
    __kind__: "ok";
    ok: Array<InventoryItem>;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface User {
    id: UserId;
    createdAt: Timestamp;
    role: Role;
    email: string;
    passwordHash: string;
    phone: string;
    lastName: string;
    firstName: string;
}
export type Result_9 = {
    __kind__: "ok";
    ok: Document;
} | {
    __kind__: "err";
    err: ApiError;
};
export type InventoryItemId = bigint;
export type UserId = Principal;
export type Result = {
    __kind__: "ok";
    ok: InventoryItem;
} | {
    __kind__: "err";
    err: ApiError;
};
export type Result_3 = {
    __kind__: "ok";
    ok: UserProfile;
} | {
    __kind__: "err";
    err: ApiError;
};
export type MessageId = bigint;
export type ApiError = {
    __kind__: "notFound";
    notFound: null;
} | {
    __kind__: "internalError";
    internalError: string;
} | {
    __kind__: "unauthorized";
    unauthorized: null;
} | {
    __kind__: "badRequest";
    badRequest: string;
};
export type Result_8 = {
    __kind__: "ok";
    ok: Message;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface SafetyAssessment {
    potentialThreats: boolean;
    restrainingOrder: boolean;
    petsPresent: boolean;
    notes?: string;
    policeInvolvement: boolean;
    childrenPresent: boolean;
    historyOfConflict: boolean;
    weaponsConcern: boolean;
}
export interface Message {
    id: MessageId;
    content: string;
    bookingId: BookingId;
    createdAt: Timestamp;
    senderRole: Role;
    attachments: Array<string>;
    senderId: UserId;
}
export interface UserProfile {
    id: UserId;
    createdAt: Timestamp;
    role: Role;
    email: string;
    phone: string;
    lastName: string;
    firstName: string;
}
export interface Address {
    zip: string;
    street: string;
    city: string;
    unit?: string;
    gateCode?: string;
    specialInstructions?: string;
    state: string;
}
export enum DocumentType {
    pdf = "pdf",
    report = "report",
    signature = "signature",
    receipt = "receipt",
    other = "other",
    video = "video",
    photo = "photo"
}
export enum ItemCondition {
    damaged = "damaged",
    fair = "fair",
    good = "good",
    poor = "poor",
    excellent = "excellent"
}
export enum ItemStatus {
    damaged = "damaged",
    disputed = "disputed",
    pending = "pending",
    notRetrieved = "notRetrieved",
    retrieved = "retrieved"
}
export enum PaymentStatus {
    pending = "pending",
    paid = "paid",
    refunded = "refunded",
    failed = "failed"
}
export enum Priority {
    low = "low",
    high = "high",
    critical = "critical",
    medium = "medium"
}
export enum RetrievalStatus {
    closed = "closed",
    reviewing = "reviewing",
    documentationComplete = "documentationComplete",
    arrived = "arrived",
    traveling = "traveling",
    requestReceived = "requestReceived",
    finished = "finished",
    inProgress = "inProgress",
    coordinatorAssigned = "coordinatorAssigned"
}
export enum RetrievalType {
    separation = "separation",
    emergency = "emergency",
    propertyExchange = "propertyExchange",
    storage = "storage",
    familyConflict = "familyConflict",
    breakup = "breakup",
    roommate = "roommate"
}
export enum Role {
    admin = "admin",
    customer = "customer",
    staff = "staff"
}
export interface backendInterface {
    addDocument(bookingId: BookingId, docType: DocumentType, url: string, name: string): Promise<Result_9>;
    addInventoryItem(bookingId: BookingId, name: string, photoUrls: Array<string>, description: string | null, estimatedValue: bigint | null, priority: Priority): Promise<Result>;
    addMessage(bookingId: BookingId, content: string, attachments: Array<string>): Promise<Result_8>;
    cancelBooking(id: BookingId): Promise<Result_2>;
    createBooking(retrievalType: RetrievalType, pickupAddress: Address, safetyAssessment: SafetyAssessment, scheduledDate: Timestamp, totalAmount: bigint): Promise<Result_2>;
    getBooking(id: BookingId): Promise<Result_2>;
    getCoordinatorLocation(bookingId: BookingId): Promise<Result_1>;
    getDocuments(bookingId: BookingId): Promise<Result_7>;
    getInventoryItems(bookingId: BookingId): Promise<Result_6>;
    getMessages(bookingId: BookingId): Promise<Result_5>;
    getMyBookings(): Promise<Result_4>;
    getUserProfile(): Promise<Result_3>;
    listBookings(): Promise<Result_4>;
    loginUser(input: LoginInput): Promise<Result_3>;
    registerUser(input: RegisterInput): Promise<Result_3>;
    updateBookingStatus(id: BookingId, status: RetrievalStatus): Promise<Result_2>;
    updateCoordinatorLocation(bookingId: BookingId, location: Location): Promise<Result_1>;
    updateInventoryItem(id: InventoryItemId, updates: {
        status?: ItemStatus;
        photoUrls?: Array<string>;
        name?: string;
        description?: string;
        notes?: string;
        estimatedValue?: bigint;
        priority?: Priority;
        condition?: ItemCondition;
    }): Promise<Result>;
}
