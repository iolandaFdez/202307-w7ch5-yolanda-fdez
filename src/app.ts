import express, { Request, Response } from "express";
import createDebug from "debug"
import morgan from "morgan";
import cors from "cors";

const debug = createDebug('W7: App');
export const app = express()


app.use(morgan ('dev') );
app.use(cors());
app.use(express.json())
app.get('/', (req: Request, res: Response ) => {
    debug('we are app main base')
    res.write('<h1>we are app main base</h1>');
    res.end()
})


//aquí van las rutas de los router // 