import cors from "cors";
import bodyParser from "body-parser";
import {Express, NextFunction, Request, Response} from "express";

export const appUse = (app: Express) => {
    app.use(cors());

    // parse application/json
    app.use(bodyParser.json({limit: '50mb'}));
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

    // log middleware
    app.use((req: Request, res: Response, next: NextFunction) => {
        console.log('Time: ', new Date().toString());
        console.log(req.method, req.url, 'params:', req.params);
        console.log('query:', req.query);
        console.log('body:', req.body);
        console.log('cookies:', req.cookies);
        // console.log('headers:', req.headers);
        // console.log('rawHeaders:', req.rawHeaders);
        next();
    });
};
