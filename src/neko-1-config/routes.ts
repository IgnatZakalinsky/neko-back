import {Express, Request, Response} from "express";
import file from "../neko-2-features/f-5-file/index";

export const routes = (app: Express) => {
    // routes

    app.use('/', (req: Request, res: Response) => {
        res.status(200).send('hi!');
    });

    app.use('/file', file);

    //default
    app.use((req: Request, res: Response) => {
        console.log('bad url: ', req.method, req.url);
        res.sendStatus(404);
    });
};
