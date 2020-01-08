import express, {Request, Response} from 'express';
import uuidv1 from "uuid/v1";

const auth = express.Router();
import User, {IUser} from '../models/user'

// const store = require('./../bd/fake');

auth.get('/', async (req: Request, res: Response) => {
    User.find()
        .then(users => res.status(200)
            .json({users, warnings: ['This endpoint will be deleted!!! Just for development!!!']}))
        .catch(e => res.status(500).json({error: e.toString(), errorObject: e}));
});
auth.post('/login', async (req: Request, res: Response) => {
    User.findOne({email: req.body.email})
        .then((user: IUser | null) => {
            if (!user) res.status(400).json({error: 'not correct email/password'});
            else if (user.password !== req.body.password)
                res.status(400).json({error: 'not correct email/password'});
            else {
                const token = uuidv1();
                const tokenDeathTime = req.body.rememberMe
                    ? new Date().getTime() + (1000 * 60 * 60 * 24) // 1 day
                    : new Date().getTime() + (1000 * 60 * 60 * 24 * 7); // 7 day
                User.findByIdAndUpdate(user.id, {token, tokenDeathTime}, {new: true})
                    .then((newUser: IUser | null) => {
                        if (!newUser) res.status(500).json({error: 'not updated?'});
                        else res.status(200).json({...newUser});
                    })
                    .catch(e => res.status(500).json({error: 'some error', e}))
            }
        })
        .catch(e => res.status(500).json({error: 'some error', e}));
});
auth.post('/register', async (req: Request, res: Response) => {
    User.create({
        email: req.body.email,
        password: req.body.password,
        isAdmin: false
    })
        .then((user: any) => res.status(201).json({addedUser: user, success: true}))
        .catch((e: any) => res.status(400).json({error: 'email address already exists', e}));
});
auth.post('/forgot', async (req: Request, res: Response) => {

    // const answer = store.forgot(req.body.email);

    res.send(JSON.stringify({}));
});
auth.post('/me', async (req: Request, res: Response) => {

    // const answer = store.me(req.body.token);

    res.send(JSON.stringify({}));
});

export default auth;
