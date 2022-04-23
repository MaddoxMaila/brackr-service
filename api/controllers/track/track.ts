import { db } from "../../libs/Db"
import { Coords } from "../../libs/types"


export const computePosition = async (coords: Coords,
                                      companyId: any,
                                      trackedObjectId: number) => {

    const p = await db.position.create({
        data: {
            latitude: coords.lat,
            longitude: coords.lng,
            trackedObjectId: trackedObjectId,
            companyId: companyId
        }
    })
    if(!p) throw new Error("failed to save position")

    return p

}