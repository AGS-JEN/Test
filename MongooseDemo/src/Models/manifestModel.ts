import mongoose, { Schema, Model, Document } from "mongoose";

interface IManifestQuery {
  shipmentNumber: string;
  shipmentId: string;
  type: string;
  requestId?: string;
  response?: object[];
}

interface IManifestQueryModel extends IManifestQuery, Document {}

const ManifestQuerySchema: Schema = new Schema({
  shipmentNumber: { type: String, required: true },
  shipmentId: { type: String, required: true },
  type: { type: String, required: true },
  requestId: { type: String, required: false },
  response: { type: Array, required: false, default: [] },
});

const ManifestQueryModel: Model<IManifestQueryModel> =
  mongoose.model<IManifestQueryModel>("ManifestQuery", ManifestQuerySchema);

export { IManifestQuery, IManifestQueryModel, ManifestQueryModel };
