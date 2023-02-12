import RealtimeSingleton from "../realtime"

export class LocationSocket {

    io: any

    constructor(namespace: string){
        this.io = RealtimeSingleton.getIO(namespace)
    }
    
    pushLocation(namespace: string, data: any){
        this.io.volatile.emit("location:save", data)
    }

}