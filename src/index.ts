import { createServer } from "http";
import  createDebug  from 'debug'

import { dbConnect } from "./db/db.connect.js";
import { app } from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT || 8000

const server = createServer(app);

dbConnect().then((mongoose) => {server.listen(PORT)
debug('connected to db', mongoose.connection.db.databaseName)}).catch()

const debug = createDebug('W7');




server.on('listening', () => {
    
 debug('lintening on port:', PORT)
} )

server.on('error', (error) => {
    console.log(`error: ${error.message}`)
}) 