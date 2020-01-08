import express, {Request, Response} from 'express';

const auth = express.Router();
import User from '../models/user'

// const store = require('./../bd/fake');

auth.get('/', async (req: Request, res: Response) => {
    User.find()
        .then(users => res.status(200)
            .json({users, warnings: ['This endpoint will be deleted!!! Just for development!!!']}))
        .catch(e => res.status(404).json({error: e.toString(), errorObject: e}));
});
auth.post('/login', async (req: Request, res: Response) => {
    console.log(req.body);
    //let result = await addUser(req.body.name);
    // await addUserMongo(req.body.name);
    const answer = store.login(req.body.email, req.body.password, req.body.rememberMe);

    res.send(JSON.stringify(answer));
});
auth.post('/register', async (req: Request, res: Response) => {
    console.log(req.body);
    //let result = await addUser(req.body.name);
    // await addUserMongo(req.body.name);
    const answer = store.register(req.body.email, req.body.password);

    res.send(JSON.stringify(answer));
});
auth.post('/forgot', async (req: Request, res: Response) => {
    console.log(req.body);
    //let result = await addUser(req.body.name);
    // await addUserMongo(req.body.name);
    const answer = store.forgot(req.body.email);

    res.send(JSON.stringify(answer));
});
auth.post('/me', async (req: Request, res: Response) => {
    console.log(req.body);
    //let result = await addUser(req.body.name);
    // await addUserMongo(req.body.name);
    const answer = store.me(req.body.token);

    res.send(JSON.stringify(answer));
});

export default auth;
