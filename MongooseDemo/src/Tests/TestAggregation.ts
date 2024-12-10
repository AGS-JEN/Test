import { Types } from "mongoose";
import { CompanyModel } from "../Models/companyModel";
import { ShipmentModel } from "../Models/shipmentModel";

export async function TestAggregation(){

    const aggregation: any = [
        {
            '$match': {branchCode:'LAX'}
        },
        {
            '$lookup': {
                'from': 'brokers',
                'localField': 'clientBrokerId',
                'foreignField': '_id',
                'as': 'clientBroker'
            }
        }, {
            '$unwind': {
                'path': '$clientBroker',
                'preserveNullAndEmptyArrays': true
            }
        },
        {
            '$lookup': {
                from: 'Organization',
                localField: 'clientId',
                foreignField: '_id',
                as: 'client'
            },
        },
        {
            '$unwind': {
                'path': '$client',
                'preserveNullAndEmptyArrays': true
            }
        },
        {
            '$lookup': {
                from: 'Organization',
                localField: 'deconsolidatorId',
                foreignField: '_id',
                as: 'deconsolidator'
            },
        },
        {
            '$unwind': {
                'path': '$deconsolidator',
                'preserveNullAndEmptyArrays': true
            }
        },
        {
            '$project': {
                '_id': 1,
                'shipmentNumber': 1,
                'branchId': 1,
                'branchCode': 1,
                'destinationPortId': 1,
                'destinationPortCode': 1,
                'originPortId': 1,
                'originPortCode': 1,
                'entryType': 1,
                'carrierId': 1,
                'carrierCode': 1,
                'statusId': 1,
                'holdsToBillCount': 1,
                'housesCount': 1,
                'receptaclesCount': 1,
                'totalPallets': {
                    '$ifNull': ['$totalPallets', 0]
                },
                'remarksInternal': {
                    '$ifNull': ['$remarksInternal', '']
                },
                'remarksClient': {
                    '$ifNull': ['$remarksClient', '']
                },
                'iscAmountPaid': {
                    '$ifNull': ['$iscAmountPaid', 0]
                },
                'bup': {
                    '$ifNull': ['$bup', false]
                },
                'active': 1,
                'totalWeight': 1,
                'received1f': {
                    '$ifNull': ['$received1f', false]
                },
                'acasSubmittedCount': 1,
                'acasOnHoldCount': 1,
                'acasAcceptedCount': 1,
                'amsSubmittedCount': 1,
                'amsOnHoldCount': 1,
                'amsReleasedCount': 1,
                'entrySubmittedCount': 1,
                'entryAcceptedCount': 1,
                'entryReleasedCount': 1,
                'entryOnHoldCount': 1,
                'clientId': 1,
                'clientName': 1,
                'clientBrokerId': 1,
                'clientBrokerName': '$clientBroker.name',
                'deconsolidatorId': 1,
                'deconsolidatorName': 1,
                'createdAt': 1,
                'createdBy': 1,
                'flights': 1,
                'isSplit': 1,
            }
        },
        {
            '$skip': 0
        }, {
            '$limit': 10
        },
        {
            '$count': 'total'
        }
    ];
    const result = await ShipmentModel.aggregate(aggregation).exec();
    console.log("aggregation result = ", JSON.stringify(result));
    return result;

}


export async function TestAggregation2(){

    const aggregation: any = [
        {
            '$match': {branchCode:'LAX'}
        },
        {
            '$count': 'total'
        },
        {
            '$skip': 0
        }, {
            '$limit': 10
        }
    ];
    const result = await ShipmentModel.aggregate(aggregation).exec();
    console.log("aggregation result = ", JSON.stringify(result));
    return result;

}


export async function TestAgg2() {
    const aggregationResult = await CompanyModel.aggregate([
        {
          $match: { _id: new Types.ObjectId("66b381df4a17e200495cef91") },
        },
        // {
        //   $lookup: {
        //     from: "brokers",
        //     localField: "brokers",
        //     foreignField: "_id",
        //     as: "allBrokers",
        //   },
        // },
        {
            $addFields: {
                brokerObjectIds: {
                    $map: {
                        input: "$brokers",
                        as: "brokerId",
                        in: { $toObjectId: "$$brokerId" }
                    }
                }
            }
        },
        { $lookup: {
            from: "brokers",
            localField: "brokerObjectIds",
            foreignField: "_id",
            as: "allBrokers"
        }
        },
        // {
        //   $unwind: "$allBrokers",
        // },
        // {
        //   $project: {
        //     name: 1,
        //     brokers: 1,
        //     totalCount: 1,
        //   },
        // },
      ]);
    console.log("result is :");;
    console.log(aggregationResult);
    console.log("-------------------------");
    
    console.log(aggregationResult[0].allBrokers)
    
    
}