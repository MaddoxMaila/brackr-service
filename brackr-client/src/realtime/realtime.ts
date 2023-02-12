import {io} from 'socket.io-client'
import { SOCKETIO_URL } from '../constants'


export default class RealtimeSingleton{
    /**
     * Singleton pattern implementation with multi-socket-io single instances(better explaination need ;)
     * They multi because I'm using namespaces which require their own instance connection!
     */

    static IOs: any = {}

    constructor(namespace: string){

        RealtimeSingleton.IOs[namespace] = io(`${SOCKETIO_URL}/${namespace}`)

    }

    static getIO(namespace: string){
        
        const keys: string[] = Object.keys(RealtimeSingleton.IOs)
        if(!keys.includes(namespace))
            new RealtimeSingleton(namespace)
        return RealtimeSingleton.IOs[namespace]

    }
}