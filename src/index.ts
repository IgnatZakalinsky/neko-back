import express from 'express';
import mongoose from 'mongoose';
import {config} from "./neko-1-config";

const {MongoDBUris, appUse, routes} = config;

const app = express();

appUse(app);
routes(app);

mongoose.connect(MongoDBUris, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB connected successfully');

        //start
        app.listen(process.env.PORT, () => {
            console.log('Neko-back listening on port: ' + process.env.PORT);
        });
        console.log('start...');
    })
    .catch(e => console.log('MongoDB connection error: ' + e));

process.on('unhandledRejection', (reason, p) => {
    console.log('unhandledRejection: ', reason, p);
});
