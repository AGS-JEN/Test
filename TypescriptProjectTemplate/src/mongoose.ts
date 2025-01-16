import mongoose from "mongoose";

// 假设你已经定义了User, Role, Permission的Schema
const UserSchema = new mongoose.Schema({
  email: String,
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "roles" }],
});

const RoleSchema = new mongoose.Schema({
  name: String,
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "permissions" }],
});

const PermissionSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model("users", UserSchema);
const Role = mongoose.model("roles", RoleSchema);
const Permission = mongoose.model("permissions", PermissionSchema);

async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/nimbus-001");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// 查询指定email的用户及其关联的角色和权限
async function getUserWithRolesAndPermissions(email: string) {
  try {
    await connectToMongoDB();
    const user = await User.findOne({ email: email })
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
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
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
