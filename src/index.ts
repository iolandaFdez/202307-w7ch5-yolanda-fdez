import { createServer } from "http";
import  createDebug  from 'debug'
import { app } from "./types/app.js";
import { dbConnect } from "./db/db.connect.js";

const server = createServer(app);

dbConnect().then((mongoose) => {server.listen(PORT)
debug('connected to db', mongoose.connection.db.databaseName)}).catch()

const debug = createDebug('W7');

const PORT = process.env.PORT || 5000;


server.on('listening', () => {
    
 debug('lintening on port:', PORT)
} )

server.on('error', (error) => {
    console.log(`error: ${error.message}`)
}) 