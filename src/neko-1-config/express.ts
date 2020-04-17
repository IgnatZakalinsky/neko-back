import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import {Express, NextFunction, Request, Response} from "express";
import multer from 'multer';

export const appUse = (app: Express) => {
    app.use(cors());

    // parse application/json
    app.use(bodyParser.json({limit: '150mb'}));
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({limit: '150mb', extended: false}));

    // доступ к файлам, ...возможно не нужен
    app.use('/static', express.static(__dirname + '/files'));
    // Теперь чтобы обратиться к файлу about.html, необходимо отправить запрос http://localhost:3000/static/about.html.

    // for files
    app.use(multer({dest:"uploads"}).single("filedata"));

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
