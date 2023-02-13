import processPositionQueue from "../tasks/position-dwx-task"

type Params = {
    lat: number,
    lng: number,
    trackedObjectId: any,
    companyId: any,
    journeyId: any
}
export const computePosition = async (params: Params) => {

    processPositionQueue.add(params)

}