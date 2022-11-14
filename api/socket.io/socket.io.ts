import {Server} from 'socket.io'


export class SocketIOSingleton{
    /**
     * Socket IO singleton pattern implementation.
     * Just making sure only one objection of the server instance exists throught out the entire runtime of the application
     */

    static io: any = null

    constructor(){
        /**
         * Never call this constructor directly in code, always call the static method "getIO"
         */
        SocketIOSingleton.io = new Server(parseInt(process.env.SOCKET_IO_PORT || "3000"), {
            cors: {
                origin: "http://localhost:19006",
                methods: ["GET", "POST"]
              }
        })
    }

    static getIO(){
        /**
         * Main Singleton pattern logic.
         * If null created the Server else Server is already created, return that!
         */
        if(SocketIOSingleton.io === null)
             new SocketIOSingleton()
        return SocketIOSingleton.io
    }

    static onConnection(){
        SocketIOSingleton.getIO().on("connection", (socket: any) => {
            console.log("Socket IO connected!")
        })
    }

    static onDisconnect(){

    }

}


