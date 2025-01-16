"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// 假设你已经定义了User, Role, Permission的Schema
const UserSchema = new mongoose_1.default.Schema({
    email: String,
    roles: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "roles" }],
});
const RoleSchema = new mongoose_1.default.Schema({
    name: String,
    permissions: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "permissions" }],
});
const PermissionSchema = new mongoose_1.default.Schema({
    name: String,
});
const User = mongoose_1.default.model("users", UserSchema);
const Role = mongoose_1.default.model("roles", RoleSchema);
const Permission = mongoose_1.default.model("permissions", PermissionSchema);
function connectToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect("mongodb://localhost:27017/nimbus-001");
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        }
    });
}
// 查询指定email的用户及其关联的角色和权限
function getUserWithRolesAndPermissions(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectToMongoDB();
            const user = yield User.findOne({ email: email })
                .populate({
                path: "roles",
                select: "role",
                populate: {
                    path: "permissions",
                    select: "permission",
                },
            })
                .exec();
            if (!user) {
                console.log("User not found");
                return null;
            }
            return user;
        }
        catch (error) {
            console.error("Error fetching user:", error);
            throw error;
        }
    });
}
// export function testMongoose(email: string) {
//   // 使用示例
//   getUserWithRolesAndPermissions(email)
//     .then((user) => {
//       if (user) {
//         console.log("User:", user);
//         console.log("Roles:", user.roles);
//         console.log(
//           "Permissions:",
//           user.roles.flatMap((role) => role.permissions)
//         );
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }
