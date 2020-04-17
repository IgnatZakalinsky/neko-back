import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import {Express, NextFunction, Request, Response} from "express";
import multer from 'multer';

export const appUse = (app: Express) => {
    app.use(cors());

    // parse application/json
    app.use(bodyParser.json({limit: '50mb'}));
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

    // доступ к файлам, ...возможно не нужен
    app.use('/static', express.static(__dirname + '/files'));
    // Теперь чтобы обратиться к файлу about.html, необходимо отправить запрос http://localhost:3000/static/about.html.

    // for files
    const storageConfig = multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, "uploads");
        },
        filename: (req, file, cb) =>{
            // cb(null, file.originalname);
            cb(null, 'file');
        }
    });
    // // определение фильтра
    // const fileFilter = (req, file, cb) => {
    //
    //     if(file.mimetype === "image/png" ||
    //         file.mimetype === "image/jpg"||
    //         file.mimetype === "image/jpeg"){
    //         cb(null, true);
    //     }
    //     else{
    //         cb(null, false);
    //     }
    // }
    // app.use(multer({storage:storageConfig, fileFilter: fileFilter}).single("filedata"));
    app.use(multer({storage:storageConfig}).single("myFile"));
    // app.use(multer({dest:"uploads"}).single("myFile")); // !!!fieldName like on front!!!

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
