import {Server} from 'socket.io'

const io = new Server(2728, { /* options */ });

io.on("connection", (socket) => {
    
    console.log("Connected")

});

io.listen(3000);