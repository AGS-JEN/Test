import mongoose from "mongoose";
import { CompanyModel } from "./Models/companyModel";
import { BranchModel } from "./Models/branchModel";
import { DbConnectString, DbConnectString_local } from "./config";
import { TestAgg2, TestAgg3, TestAggregation, TestAggregation5, TestAggregation6 } from "./Tests/TestAggregation";
import { testUpsert } from "./Tests/TestUpsert";

// 假设你已经定义了User, Role, Permission的Schema
const PermissionSchema = new mongoose.Schema({
  permission: String,
});
const RoleSchema = new mongoose.Schema({
  name: String,
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
});
const UserSchema = new mongoose.Schema({
  email: String,
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
});


const User = mongoose.model("User", UserSchema);
const Role = mongoose.model("Role", RoleSchema);
const Permission = mongoose.model("Permission", PermissionSchema);


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
        populate: {
          path: "permissions",
          select:'permission', 
          model:'Permission',
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


export function testMongoose2(email: string) {
  // 使用示例
  getUserWithRolesAndPermissions(email)
    .then((user) => {
      if (user) {
        // console.log("User:", user);
        console.log("Roles:", user.roles);
        console.log(
          "Permissions:",
          user.roles.flatMap((role:any) => role.permissions)
        );
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}



export async function mainTest() {
  // await connectToMongoDB();  
  await mongoose.connect(DbConnectString);
  console.log("Connected...");
  // await testUpsert();
  // TestAgg2();
  // TestAgg3(['67587f59b572ea286ee6a415','66be0c7586120ca1f2f53e6b']);
  //  TestAggregation5();
  //  TestAggregation6();
   TestAgg2();
  return "test complete.";
}

