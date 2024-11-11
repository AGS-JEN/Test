import mongoose, { Schema, Types, Model, Document } from "mongoose";

interface ISmallContact {
    name: string;
    phoneNumber?: string;
    email?: string;
}

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

interface IBranchManager {
    name: string;
    initials: string;
}

interface IBranch{
    name: string;
    code: string;
    companyId: Types.ObjectId;
    contact?: ISmallContact;
    branchManager: IBranchManager;
    users: Types.ObjectId[];
    createdAt: Date;
    createdBy: string;
    updatedAt?: Date;
    updatedBy?: string;
    active: boolean;
}

export interface IBranchModel extends IBranch, Document {
}

const ContactSchema: Schema = new Schema({
    name: { type: String, required: true, maxlength: 50 },
    phoneNumber: { type: String, required: true, maxlength: 15 },
    email: { type: String, required: true, maxlength: 60 },
});

// Define the schema for the branch_manager object
const BranchManagerSchema: Schema = new Schema({
    name: { type: String, required: true, maxlength: 50 },
    initials: { type: String, required: true, minlength: 2, maxlength: 2 },
});

// Define the schema for the branch collection
const BranchSchema: Schema = new Schema({
    name: { type: String, required: true, maxlength: 50 },
    code: { type: String, required: true, minlength: 3, maxlength: 3 },
    companyId: { type: Types.ObjectId, required: true, ref: 'Company' },
    contact: { type: ContactSchema, required: false },
    branchManager: { type: BranchManagerSchema, required: true },
    users: { type: [Types.ObjectId], ref: 'User', default: [] },
    createdAt: { type: Date, required: true, default: Date.now },
    createdBy: { type: String, required: true, maxlength: 60 },
    updatedAt: { type: Date, required: false },
    updatedBy: { type: String, maxlength: 60, required: false },
    active: { type: Boolean, required: true, default: true }
});

BranchSchema.index({ code: 1, companyId: 1 }, { unique: true });

export const BranchModel: Model<any> = mongoose.models.Branch || mongoose.model<any>('Branch', BranchSchema);