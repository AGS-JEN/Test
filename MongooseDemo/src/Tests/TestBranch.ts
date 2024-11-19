import { BranchModel } from "../Models/branchModel";
import { CompanyModel } from "../Models/companyModel";

export async function TestBranch() {
  const companyBrokerIds = await CompanyModel.findById(
    "66b381df4a17e200495cef91"
  )
    .select("branches")
    .populate("branches")
    .exec();
  console.log(companyBrokerIds);

  const branches = await BranchModel.find({
    _id: { $in: companyBrokerIds?.branches },
  }).exec();
  console.log("branches value is :");

  console.log(branches);

  const total = branches.length;
}
