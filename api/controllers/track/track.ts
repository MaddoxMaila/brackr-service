import { db } from "../../libs/Db"
import { Coords } from "../../libs/types"

type Params = {
    lat: number,
    lng: number,
    trackedObjectId: any,
    companyId: any,
    journeyId: any
}
export const computePosition = async (params: Params) => {

    const p = await db.position.create({
        data: {
            latitude: params.lat,
            longitude: params.lng,
            trackedObjectId: params.trackedObjectId,
            companyId: params.companyId,
            journeyId: params.journeyId
        }
    })
    if(!p) throw new Error("failed to save position")

    return p

}