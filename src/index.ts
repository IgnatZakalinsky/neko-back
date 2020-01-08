import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import auth from './controllers/auth';
import shop from './controllers/shop';
import file from './controllers/file';

const app = express();
mongoose.connect(
    'mongodb+srv://ai73aaa:1qazxcvBG@neko0-iwojt.mongodb.net/nekobd?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(e => console.log('MongoDB connection error: ' + e));

app.use(cors());

// parse application/json
app.use(bodyParser.json({limit: '200mb'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '200mb', extended: false}));

// log middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Time: ', new Date().toString());
    console.log(req.method, req.url, 'params:', req.params);
    console.log('query:', req.query);
    console.log('body:', req.body);
    // console.log('headers:', req.headers);
    // console.log('rawHeaders:', req.rawHeaders);
    next();
});

// routes
app.use('/auth', auth);
app.use('/shop', shop);
app.use('/file', file);

//default
app.use((req: Request, res: Response) => {
    console.log('bad url: ', req);
    res.send(404);
});

//start
app.listen(process.env.PORT, () => {
    console.log('Neko-back app listening on port: ' + process.env.PORT);
});
console.log('start...');

process.on('unhandledRejection', (reason, p) => {
    console.log('unhandledRejection: ', reason, p);
});
