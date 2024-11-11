import mongoose , {Schema, Types, Model, Document} from "mongoose";

interface ICompany {
    name: string;
    brokers: Types.ObjectId[];
    branches: Types.ObjectId[];
    createdAt?: Date;
    createdBy: string;
    updatedAt?: Date;
    updatedBy?: string;
    active: boolean;
};

interface ICompanyModel extends ICompany, Document {};

const CompanySchema: Schema = new Schema({
    name: { type: String, required: true, maxlength: 50 },
    brokers: { type: [Types.ObjectId], required: true, ref: 'Broker', default: [] },
    branches: { type: [Types.ObjectId], required: true, ref: 'Branch', default: [] },
    createdAt: { type: Date, required: true, default: Date.now },
    createdBy: { type: String, required: true, maxlength:60 },
    updatedAt: { type: Date, required: false },
    updatedBy: { type: String, required: false, maxlength: 60},
    active: { type: Boolean, required: true, default: true}
});

const CompanyModel: Model<ICompanyModel> = mongoose.model<ICompanyModel>('Company', CompanySchema);
export { CompanyModel, type ICompanyModel };