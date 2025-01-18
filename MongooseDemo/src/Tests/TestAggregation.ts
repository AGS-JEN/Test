import mongoose, { Types } from "mongoose";
import { CompanyModel } from "../Models/companyModel";
import { ShipmentModel } from "../Models/shipmentModel";
import { HouseModel } from "../Models/houseModel";



export async function TestAggregation() {
  const aggregation: any = [
    {
      $match: { branchCode: "LAX" },
    },
    {
      $lookup: {
        from: "brokers",
        localField: "clientBrokerId",
        foreignField: "_id",
        as: "clientBroker",
      },
    },
    {
      $unwind: {
        path: "$clientBroker",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "Organization",
        localField: "clientId",
        foreignField: "_id",
        as: "client",
      },
    },
    {
      $unwind: {
        path: "$client",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "Organization",
        localField: "deconsolidatorId",
        foreignField: "_id",
        as: "deconsolidator",
      },
    },
    {
      $unwind: {
        path: "$deconsolidator",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        shipmentNumber: 1,
        branchId: 1,
        branchCode: 1,
        destinationPortId: 1,
        destinationPortCode: 1,
        originPortId: 1,
        originPortCode: 1,
        entryType: 1,
        carrierId: 1,
        carrierCode: 1,
        statusId: 1,
        holdsToBillCount: 1,
        housesCount: 1,
        receptaclesCount: 1,
        totalPallets: {
          $ifNull: ["$totalPallets", 0],
        },
        remarksInternal: {
          $ifNull: ["$remarksInternal", ""],
        },
        remarksClient: {
          $ifNull: ["$remarksClient", ""],
        },
        iscAmountPaid: {
          $ifNull: ["$iscAmountPaid", 0],
        },
        bup: {
          $ifNull: ["$bup", false],
        },
        active: 1,
        totalWeight: 1,
        received1f: {
          $ifNull: ["$received1f", false],
        },
        acasSubmittedCount: 1,
        acasOnHoldCount: 1,
        acasAcceptedCount: 1,
        amsSubmittedCount: 1,
        amsOnHoldCount: 1,
        amsReleasedCount: 1,
        entrySubmittedCount: 1,
        entryAcceptedCount: 1,
        entryReleasedCount: 1,
        entryOnHoldCount: 1,
        clientId: 1,
        clientName: 1,
        clientBrokerId: 1,
        clientBrokerName: "$clientBroker.name",
        deconsolidatorId: 1,
        deconsolidatorName: 1,
        createdAt: 1,
        createdBy: 1,
        flights: 1,
        isSplit: 1,
      },
    },
    {
      $skip: 0,
    },
    {
      $limit: 10,
    },
    {
      $count: "total",
    },
  ];
  const result = await ShipmentModel.aggregate(aggregation).exec();
  console.log("aggregation result = ", JSON.stringify(result));
  return result;
}

export async function TestAggregation2() {
  const aggregation: any = [
    {
      $match: { branchCode: "LAX" },
    },
    {
      $count: "total",
    },
    {
      $skip: 0,
    },
    {
      $limit: 10,
    },
  ];
  const result = await ShipmentModel.aggregate(aggregation).exec();
  console.log("aggregation result = ", JSON.stringify(result));
  return result;
}

export async function TestAggregation5() {
  const aggregation: any = [{ $match: { received1f: { $in: [true] } } }];

  const result = await ShipmentModel.aggregate(aggregation).exec();
  console.log("aggregation result = ", JSON.stringify(result));
  return result;
}

export async function TestAggregation12() {
  const aggregation: any =  [{"$match":{"$expr":{"$regexMatch":{"input":{"$dateToString":{"format":"%Y-%m-%d %H:%M:%S","date":"$arrivedDate"}},"regex":"19","options":"i"}}}},{"$match":{"createdAt":{"$gte":"2024-11-21T00:00:00.000Z","$lte":"2024-11-22T23:59:59.999Z"}}},{"$lookup":{"from":"organizations","localField":"clientId","foreignField":"_id","as":"clientDetails"}},{"$lookup":{"from":"organizations","localField":"deconsolidatorId","foreignField":"_id","as":"deconsolidatorDetails"}},{"$lookup":{"from":"carriers","localField":"carrierId","foreignField":"_id","as":"carrierDetails"}},{"$lookup":{"from":"houses","localField":"_id","foreignField":"shipmentId","as":"houseDetails"}},{"$unwind":{"path":"$clientDetails","preserveNullAndEmptyArrays":true}},{"$unwind":{"path":"$deconsolidatorDetails","preserveNullAndEmptyArrays":true}},{"$unwind":{"path":"$carrierDetails","preserveNullAndEmptyArrays":true}},{"$unwind":{"path":"$houseDetails","preserveNullAndEmptyArrays":true}},{"$project":{"_id":1,"shipmentNumber":1,"iscAmountPaid":{"$ifNull":["$iscAmountPaid",0]},"flights":1,"remarksInternal":{"$ifNull":["$remarksInternal",""]},"remarksClient":{"$ifNull":["$remarksClient",""]},"received1f":{"$ifNull":["$received1f",false]},"receptaclesCount":1,"totalPallets":{"$ifNull":["$totalPallets",0]},"bup":{"$ifNull":["$bup",false]},"branchId":1,"branchCode":1,"destinationPortId":1,"destinationPortCode":1,"originPortId":1,"originPortCode":1,"entryType":1,"carrierId":1,"carrierCode":1,"statusId":1,"holdsToBillCount":1,"housesCount":1,"expectedReceptacleCount":1,"released":1,"receptaclesSent":1,"arrivedDate":1,"airportPickupDate":1,"arrivedAtWarehouseDate":1,"consignedToFinalMileCarrierDate":1,"pickedUpDeliveredByFmCarrierDate":1,"breakdownFinishedDate":1,"deliveredByFmCarrierDate":1,"createdAt":1,"createdBy":1,"updatedAt":1,"updatedBy":1,"isSplit":1,"clientDetails.fullName":1,"deconsolidatorDetails.fullName":1,"deconsolidatorDetails.poaCreditReceived":1,"carrierDetails.type":1,"carrierDetails.name":1,"houseDetails.lastMileCarrierCode":1,"houseDetails.carrierShipmentNumber":1,"houseDetails.createdAt":1}},{"$skip":0},{"$limit":50}]

  const result = await ShipmentModel.aggregate(aggregation).exec();
  console.log("aggregation result = ", JSON.stringify(result));
  return result;
}

export async function TestAggregation8() {
  const shipmentIdsArray=[new Types.ObjectId('67083578b4ad32a0f83479f8')]
  const aggregation: any = [
    // 匹配指定的 ShipmentId
    {
      $match: {
        shipmentId: { $in: shipmentIdsArray }
      }
    },
    // 投影只选择 lastMileCarrierCode 字段
    {
      $project: {
        lastMileCarrierCode: 1,
        _id: 0
      }
    },
    // 将所有 lastMileCarrierCode 放入一个数组中
    {
      $group: {
        _id: null,
        lastMileCarrierCodes: { $addToSet: "$lastMileCarrierCode" }
      }
    },
    // 只返回 lastMileCarrierCodes 数组
    {
      $project: {
        _id: 0,
        lastMileCarrierCodes: 1
      }
    }
  ]

  const result = await HouseModel.aggregate(aggregation).exec();
  console.log("aggregation result = ", JSON.stringify(result));
  return result;
}

export async function TestAggregation6() {
  console.log("开始测试: ");
  
  const shipmentIdObj = new Types.ObjectId('6781a26282743ff6aaf67b5d');
  const aggregate =  [
      {
        '$match': {
          'shipmentId': shipmentIdObj
        }
      }, {
        '$group': {
          '_id': '$amsStatusId', 
          'total': {
            '$sum': 1
          }
        }
      }, {
        '$project': {
          'statusName': {
            '$switch': {
              'branches': [
                {
                  'case': {
                    '$eq': [
                      '$_id', 0
                    ]
                  }, 
                  'then': 'NotSubmitted'
                }, {
                  'case': {
                    '$eq': [
                      '$_id', 1
                    ]
                  }, 
                  'then': 'Submitted'
                }, {
                  'case': {
                    '$eq': [
                      '$_id', 2
                    ]
                  }, 
                  'then': 'DataAccepted'
                }, {
                  'case': {
                    '$eq': [
                      '$_id', 3
                    ]
                  }, 
                  'then': 'Released'
                }, {
                  'case': {
                    '$eq': [
                      '$_id', 4
                    ]
                  }, 
                  'then': 'Rejected'
                }, {
                  'case': {
                    '$eq': [
                      '$_id', 5
                    ]
                  }, 
                  'then': 'OnHold'
                }
              ], 
              'default': 'NotSubmitted'
            }
          }, 
          'total': 1
        }
      }, {
        '$group': {
          '_id': '$statusName', 
          'total': {
            '$sum': '$total'
          }
        }
      }
    ]

  const [result, shipment] = await Promise.all([ HouseModel.aggregate(aggregate), ShipmentModel.findById('6781a26282743ff6aaf67b5d')]);
  const amsStatus =  [
      "NotSubmitted",
      "Submitted",
      "DataAccepted",
      "Released",
      "Rejected",
      "OnHold"
  ];
  console.log("house aggregation result: ", result);
  console.log("shipment: ", shipment)
  

  const resultStatus =  amsStatus.map((status) => {
      const total = result.find((r) => r._id === status)?.total || 0;
      return {
          status,
          total
      }
  });

   resultStatus.push({ status: 'TotalHouses', total: shipment?.housesCount || 0 });
   return resultStatus;
}

export async function TestAgg2() {
  const shipmentIdObj = new Types.ObjectId('6781a14f82743ff6aaf64893');
  const aggregationResult = await HouseModel.aggregate([
    {
      '$match': {
        'shipmentId': shipmentIdObj
      }
    }
  ]);
  console.log("result is :");
  console.log(aggregationResult);
  console.log("-------------------------");

  // console.log(aggregationResult[0].allBrokers);
}

export async function TestAgg3(shipmentIds: string[]) {
  const objectShipmentsIds = shipmentIds.map(
    (id) => new mongoose.Types.ObjectId(id)
  );
  const result = await HouseModel.aggregate([
    {
      $match: {
        shipmentId: { $in: objectShipmentsIds },
      },
    },
    {
      $group: {
        _id: "$shipmentId",
        ids: { $addToSet: "$_id" }, // 使用 $push 也可以，取决于你是否需要唯一性
      },
    },
  ]);
  console.log(result);
}
