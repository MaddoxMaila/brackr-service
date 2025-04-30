import { computePosition } from "../../dwx/TrackPosition";
import { LOGGER } from "../../libs/logger";
import { SocketIOSingleton } from "../socket.io";


export default class LocationSocketIONamespace{
    
    io: any;

    constructor(){
        /**
         * SocketIO interface for saving bus locations
         */

        // Get the socket instance
        this.io = SocketIOSingleton.getIO()

    }

    init(){
        /**
         * Location namespace initialization and event handlers definition.
         * Namespace name e.g bus-id => bus-1, bus-2, ..., bus-n
         */
        this.io.of(/^\/bus-\d+$/).on("connection", (socket: any) => {
            LOGGER("SOCKET.IO", `namespace connected : ${socket.nsp.name}`)
            socket.on("location:save", this.saveLocation)
            socket.on("notification:new", this.newNotification)
        })
    }

    saveLocation(data: any){
        /**
         * Save the location co-ordinates to database.
         * TODO: implement a celery task to make database operations lighter
         */
        computePosition(data)
    }

    readLocation(data: any){
        /**
         * Read location sent from bus then emit it to all connected clients
         */
    }

    newNotification(){}

}