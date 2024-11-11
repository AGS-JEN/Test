import mongoose, { Model, Schema, Types } from "mongoose";

interface IPermission {
  _id?: string | Types.ObjectId | unknown;
  permission: string;
  createdAt?: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  active: boolean;
}

interface IRole {
  _id?: string | Types.ObjectId | unknown;
  role: string;
  permissions: IPermission[] | Types.ObjectId[];
  createdAt?: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  active: boolean;
}

export interface IUser {
  // _id: Types.ObjectId;
  name: string;
  email: string;
  roles: IRole[] | Types.ObjectId[];
  branches?: Types.ObjectId[];
  primaryBranch?: Types.ObjectId;
  organizations?: Types.ObjectId[];
  broker?: Types.ObjectId;
  createdAt?: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  active: boolean;
  siteTheme: "dark" | "light";
  companyId: Types.ObjectId;
  password?: string;
  numberOfFailedLoginAttempts?: number;
  getFirstRole?(): { id: string; role: string };
}
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name must be at most 50 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: [60, "Email must be at most 60 characters long"],
    match: [/^\S+@\S+\.\S+$/, "Please fill a valid email address"],
  },
  password: { type: String, required: true },
  roles: { type: [Types.ObjectId], required: true, ref: "Role" },
  branches: { type: [Types.ObjectId], required: false, ref: "Branch" },
  primaryBranch: { type: Types.ObjectId, required: false },
  organizations: {
    type: [Types.ObjectId],
    required: false,
    ref: "Orginization",
  },
  broker: { type: Types.ObjectId, required: false, ref: "Broker" }, //review this
  createdAt: { type: Date, required: true, default: Date.now },
  createdBy: { type: String, required: true, maxlength: 60 },
  updatedAt: { type: Date, required: false, default: Date.now },
  updatedBy: { type: String, required: false, maxlength: 60 },
  active: { type: Boolean, required: true },
  siteTheme: { type: String, required: true, enum: ["dark", "light"] },
  companyId: { type: Types.ObjectId, required: true, ref: "Company" },
  numberOfFailedLoginAttempts: { type: Number, required: false, default: 0 },
});
const RoleSchema: Schema = new Schema({
  role: {
    type: String,
    required: true,
    maxlength: 30,
    minLength: 1,
    unique: true,
  },
  permissions: {
    type: [Types.ObjectId],
    required: true,
    ref: "Permission",
    default: [],
  },
  createdAt: { type: Date, required: true, default: Date.now },
  createdBy: { type: String, required: true, maxlength: 60 },
  updatedAt: { type: Date, required: false },
  updatedBy: { type: String, required: false, maxlength: 60 },
  active: { type: Boolean, required: true, default: true },
});

const RoleModel: Model<IRole> = mongoose.model<IRole>("Role", RoleSchema);
const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export const testmongo = async () => {
  await mongoose.connect("mongodb://localhost:27017/nimbus-001");

  const users = await UserModel.findById("6711c5c51aee83d0a21b611a")
    .select("role")
    .populate({
      path: "roles",
      select: "role",
      model: "Role",
    })
    .exec();
  console.log("Users:", users);
};
