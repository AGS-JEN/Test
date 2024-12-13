import mongoose, { Schema, Types, Model, Document } from "mongoose";

interface IContact {
  name: string;
  phoneNumber?: string;
  email?: string;
  address1: string;
  address2?: string;
  city: string;
  state?: string;
  zipCode?: string;
  country: string;
}

interface IHouse {
  houseNumber: string;
  shipmentId: Types.ObjectId;
  shipmentNumber?: string;
  stausId: number;
  amsStatusId?: number;
  acasStatusId?: number;
  entryStatusId?: number;
  consignorId?: string;
  consignee: IContact;
  shipper: IContact;
  receptacleId: string;
  lastMileCarrierCode?: string;
  totalWeight: number;
  parcelValue: number;
  flightNumber?: string;
  flightImporter?: string;
  partialReferenceNumber?: string;
  estimatedTimeArrival?: Date;
  carrierShipmentNumber?: string;
  entryNumber?: string;
  amsFilled?: boolean;
  acasFilled?: boolean;
  entryFilled?: boolean;
  releasedDate?: Date;
  comercialInvoiceBlobName?: string;
  lastTrackingNumber?: string;
  manifestBlobName?: string;
  createdBt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  active: boolean;
  pullDate?: Date;
  binNumber?: string;
  examDate?: Date;
  deliveryDate?: Date;
  archivedHeld?: boolean;
  archivedHeldReason?: string;
  isAirAcasSavedAtCustomsCity?: boolean;
  isAbiT86SavedAtCustomsCity?: boolean;
}

interface IHouseModel extends IHouse, Document {}

// Define the schema for the contact object
const ContactSchema: Schema = new Schema({
  name: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  email: { type: String, required: false },
  address1: { type: String, required: false },
  address2: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  zipCode: { type: String, required: false },
  country: { type: String, required: false },
});

// Define the schema for the house collection
const HouseSchema: Schema = new Schema({
  houseNumber: { type: String, required: true },
  shipmentId: { type: Types.ObjectId, required: true, ref: "Shipment" },
  shipmentNumber: { type: String, required: false },
  statusId: { type: Number, required: false },
  amsStatusId: { type: Number, required: false, default: 0 },
  acasStatusId: { type: Number, required: false, default: 0 },
  entryStatusId: { type: Number, required: false, default: 0 },
  consignorId: { type: String, required: false },
  consignee: { type: ContactSchema, required: false },
  shipper: { type: ContactSchema, required: false },
  receptacleId: { type: String, required: false },
  lastMileCarrierCode: { type: String, required: false },
  totalWeight: { type: Number, required: false },
  parcelValue: { type: Number, required: false },
  flightNumber: { type: String, required: false },
  flightImporter: { type: String, required: false },
  estimatedTimeArrival: { type: Date, required: false },
  partialReferenceNumber: { type: String, required: false },
  entryNumber: { type: String, required: false },
  amsFilled: { type: Boolean, required: false },
  acasFilled: { type: Boolean, required: false },
  entryFilled: { type: Boolean, required: false },
  releasedDate: { type: Date, required: false },
  comercialInvoiceBlobName: { type: String, required: false },
  lastTrackingNumber: { type: String, required: false },
  manifestBlobName: { type: String, required: false },
  createdAt: { type: Date, required: false, default: Date.now },
  carrierShipmentNumber: { type: String, required: false },
  createdBy: { type: String, required: false },
  updatedAt: { type: Date, required: false },
  updatedBy: { type: String, required: false },
  active: { type: Boolean, required: false, default: false },
  pullDate: { type: Date, required: false },
  binNumber: { type: String, required: false },
  examDate: { type: Date, required: false },
  deliveryDate: { type: Date, required: false },
  archivedHeld: { type: Boolean, required: false },
  archivedHeldReason: { type: String, required: false },
  isAirAcasSavedAtCustomsCity: { type: Boolean, required: false },
  isAbiT86SavedAtCustomsCity: { type: Boolean, required: false },
});

const HouseModel: Model<IHouseModel> =
  mongoose.models.House || mongoose.model<IHouseModel>("House", HouseSchema);
export { HouseModel, type IHouseModel };