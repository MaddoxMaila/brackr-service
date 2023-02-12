import { SocketIOSingleton } from './socket.io';

const namespaces: string[] = [
    "location"
]

namespaces.map(moduleName => {
    const namespace: any = require(`./interfaces/${moduleName}`)
    new namespace.default().init()
})


export default SocketIOSingleton