import mongoose, { Schema, Types, Model, Document } from "mongoose";

interface IFlight {
    flightNumber: string;
    estimatedTimeArrival?: Date;
    estimatedTimeDeparture?: Date;
    actualTimeArrival?: Date;
    partialReferenceNumber?: string;
    housesCount?: number;
    createdAt: Date;
    createdBy: string;
    updatedAt?: Date;
    updatedBy?: string;
};

interface IManifest {
    manifestBlobName: string;
    housesCount: number;
    receptaclesCount: number;
    totalWeight: number;
    createdAt: Date;
    createdBy: string;
};

interface IShipment {
    type: 'air' | 'ocean';
    shipmentNumber: string;
    branchId: Types.ObjectId;
    branchCode?: string;
    destinationPortId?: Types.ObjectId;
    destinationPortCode?: string;
    originPortId: Types.ObjectId;
    originPortCode?: string;
    entryType?: 'T86' | 'ECCF';
    waybillOriginatorCode?: 'F709';
    carrierId: Types.ObjectId;
    carrierCode?: string;
    chargeableWeight?: number;
    iscAmountPaid?: number;
    bup?: boolean
    statusId: number;
    totalPallets?: number;
    totalWeight?: number;
    housesCount?: number;
    receptaclesCount?: number;
    received1f?: boolean;
    holdsToBillCount?: number;
    acasSubmittedCount?: number;
    acasOnHoldCount?: number;
    acasAcceptedCount?: number;
    amsSubmittedCount?: number;
    amsOnHoldCount?: number;
    amsReleasedCount?: number;
    entrySubmittedCount?: number;
    entryAcceptedCount?: number;
    entryReleasedCount?: number;
    entryOnHoldCount?: number;
    arrivedAtWarehouse?: Date;
    consignedToFinalMileCarrier?: Date;
    pickedUpDeliveredByFmCarrier?: Date;
    clientId: Types.ObjectId; // This is the organization_id of the client
    clientName: string;
    clientBrokerId: Types.ObjectId; // This is the broker_id of the client's preferred broker
    deconsolidatorId: Types.ObjectId; // This is the organization_id of the deconsolidator
    deconsolidatorName: string;
    remarksInternal?: string;
    remarksClient?: string;
    flights?: IFlight[];
    manifests?: IManifest[];
    isSplit?: boolean;
    createdAt: Date;
    createdBy: string;
    updatedAt?: Date;
    updatedBy?: string;
    active: boolean;
    isAirAcasSavedAtCustomsCity?: boolean;
    isAbiT86SavedAtCustomsCity?: boolean;
    sendMethod?: string;
};

interface IShipmentModel extends IShipment, Document { };

// Define the schema for the flight object
const FlightSchema: Schema = new Schema({
    flightNumber: { type: String, required: true, maxlength: 7 },
    estimatedTimeArrival: { type: Date, required: false },
    estimatedTimeDeparture: { type: Date, required: false },
    actualTimeArrival: { type: Date, required: false },
    partialReferenceNumber: { type: String, required: false, maxlength: 1 },
    housesCount: { type: Number, required: false },
    createdAt: { type: Date, required: true, default: Date.now },
    createdBy: { type: String, required: true, maxlength: 60 },
    updatedAt: { type: Date, required: false },
    updatedBy: { type: String, required: false, maxlength: 60 }
});

// Define the schema for the manifest object
const ManifestSchema: Schema = new Schema({
    manifestBlobName: { type: String, required: true, maxlength: 30 },
    housesCount: { type: Number, required: true },
    receptaclesCount: { type: Number, required: true },
    totalWeight: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    createdBy: { type: String, required: true, maxlength: 60 }
});

// Define the schema for the shipment collection
const ShipmentSchema: Schema = new Schema({
    type: { type: String, required: true, enum: ['air', 'ocean'] },
    shipmentNumber: { type: String, required: true, minlength: 11, maxlength: 12 },
    branchId: { type: Types.ObjectId, required: true, ref: 'Branch' },
    branchCode: { type: String, required: false, maxlength: 3 },
    destinationPortId: { type: Types.ObjectId, required: true, ref: 'Airport' },
    destinationPortCode: { type: String, required: false, maxlength: 3 },
    originPortId: { type: Types.ObjectId, required: true, ref: 'Airport' },
    originPortCode: { type: String, required: false, maxlength: 3 },
    entryType: { type: String, required: false, enum: ['T86', 'ECCF'] },
    waybillOriginatorCode: { type: String, required: false, maxlength: 4 },
    carrierId: { type: Types.ObjectId, required: true, ref: 'Carrier' },
    carrierCode: { type: String, required: false, maxlength: 3, minlength: 2 },
    chargeableWeight: { type: Number, required: false },
    iscAmountPaid: { type: Number, required: false, default: 0 },
    bup: { type: Boolean, required: false, default: false },
    statusId: { type: Number, required: true, },
    totalPallets: { type: Number, required: false, default: 0 },
    totalWeight: { type: Number, required: false },
    housesCount: { type: Number, required: false, default: 0 },
    receptaclesCount: { type: Number, required: false },
    received1f: { type: Boolean, required: false, default: false },
    holdsToBillCount: { type: Number, required: false, default: 0 },
    acasSubmittedCount: { type: Number, required: false, default: 0 },
    acasOnHoldCount: { type: Number, required: false, default: 0 },
    acasAcceptedCount: { type: Number, required: false, default: 0 },
    amsSubmittedCount: { type: Number, required: false, default: 0 },
    amsOnHoldCount: { type: Number, required: false, default: 0 },
    amsReleasedCount: { type: Number, required: false, default: 0 },
    entrySubmittedCount: { type: Number, required: false, default: 0 },
    entryAcceptedCount: { type: Number, required: false, default: 0 },
    entryReleasedCount: { type: Number, required: false, default: 0 },
    entryOnHoldCount: { type: Number, required: false, default: 0 },
    arrivedAtWarehouse: { type: Date, required: false },
    consignedToFinalMileCarrier: { type: Date, required: false },
    pickedUpDeliveredByFmCarrier: { type: Date, required: false },
    clientId: { type: Types.ObjectId, required: true, ref: 'Organization' },
    clientName: { type: String, required: false, maxlength: 50 },
    clientBrokerId: { type: Types.ObjectId, required: false, ref: 'Broker' },
    deconsolidatorId: { type: Types.ObjectId, required: true, ref: 'Organization' },
    deconsolidatorName: { type: String, required: false, maxlength: 50 },
    remarksInternal: { type: String, required: false, maxlength: 250 },
    released: { type: String, required: false },
    remarksClient: { type: String, required: false, maxlength: 250 },
    flights: { type: [FlightSchema], required: false, default: [] },
    manifests: { type: [ManifestSchema], required: false, default: [] },
    isSplit: { type: Boolean, required: false },
    createdAt: { type: Date, required: true },
    createdBy: { type: String, required: true, maxlength: 60 },
    updatedAt: { type: Date, required: false },
    updatedBy: { type: String, required: false, maxlength: 60 },
    active: { type: Boolean, required: true, default: true },
    isAirAcasSavedAtCustomsCity: { type: Boolean, required: false, default: false },
    isAbiT86SavedAtCustomsCity: { type: Boolean, required: false, default: false },
    sendMethod: { type: String, required: false, maxlength: 50 }
});

const ShipmentModel: Model<IShipmentModel> = mongoose.models.Shipment || mongoose.model<IShipmentModel>('Shipment', ShipmentSchema);
export { ShipmentModel, type IShipmentModel };