import { SocketIOSingleton } from "../socket.io";


export default class LocationSockerIONamespace{
    
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
            console.log(`Namespace: ${socket.nsp}`)
            socket.on("location:save", this.saveLocation)
        })
    }

    saveLocation(data: any){
        /**
         * Save the location co-ordinates to database.
         * TODO: implement a celery task to make database operations lighter
         */
        console.log(`LOCATION SAVE: ${data}`)
    }

    readLocation(data: any){
        /**
         * Read location sent from bus then emit it to all connected clients
         */
    }

}