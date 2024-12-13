import { ManifestQueryModel } from "../Models/manifestModel";

export async function testUpsert() {
    // shipmentNumber: { type: String, required: true },
    // shipmentId: { type: String, required: true },
    // type: { type: String, required: true },
    // requestId: { type: String, required: false },
    // response: { type: Array, required: false, default: [] },

    const newManifestQuery = {
        shipmentId: 'testShipmentId',
        type: 'msgObj.apiRequestBody.type',
        shipmentNumber: 'testNumber',
        requestId: 'requestIdId'
      }

  const updateResponse = await ManifestQueryModel.updateOne(
    { _id: "66b3fb9e34c177e2a1eed8f1" },
    newManifestQuery,
    { upsert: true }
  );
  console.log(updateResponse);
}
