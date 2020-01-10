import express, {Request, Response} from 'express';
import uuidv1 from "uuid/v1";

const auth = express.Router();
import User, {IUser} from '../models/user'
import {emailValidator, passwordValidator} from "../helpers/validators";

auth.get('/', async (req: Request, res: Response) => {
    User.find()
        .then(users =>
            res.status(200)
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
                    ? new Date().getTime() + (1000 * 60 * 60 * 24 * 7) // 7 day
                    : new Date().getTime() + (1000 * 60 * 60 * 24); // 1 day

                User.findByIdAndUpdate(
                    user.id,
                    {token, tokenDeathTime, rememberMe: req.body.rememberMe},
                    {new: true})
                    .then((newUser: IUser | null) => {
                        if (!newUser) res.status(500).json({error: 'not updated?'});

                        else res.status(200).json({...newUser._doc, name: user.email});
                    })
                    .catch(e => res.status(500).json({error: 'some error', e}))
            }
        })
        .catch(e => res.status(500).json({error: 'some error', e}));
});

auth.post('/register', async (req: Request, res: Response) => {
    if (!emailValidator(req.body.email))
        res.status(400).json(
            {
                error: 'Email not valid! /^[\\w]{1}[\\w-\\.]*@[\\w-]+\\.[a-z]{2,7}$/i.test(\'x@x.xx\')',
                email: req.body.email
            });
    if (!passwordValidator(req.body.password))
        res.status(400)
            .json({error: 'Password not valid! must be more than 7 characters...', password: req.body.password});

    User.create({
        email: req.body.email,
        password: req.body.password,
        rememberMe: false,
        isAdmin: false
    })
        .then((user: IUser) => res.status(201).json({addedUser: user, success: true}))

        .catch(e => res.status(400).json({error: 'email address already exists', e}));
});

auth.post('/forgot', async (req: Request, res: Response) => {
    User.findOne({email: req.body.email})
        .then((user: IUser | null) => {
            if (!user) res.status(404).json({error: 'Email address not found'});

            else res.status(200).json({error: "sorry, I can't send new password on your email"});
        })
        .catch(e => res.status(500).json({error: 'some error', e}));
});

auth.post('/me', async (req: Request, res: Response) => {
    User.findOne({token: req.body.token})
        .then((user: IUser | null) => {
            if (!user || user.tokenDeathTime < new Date().getTime())
                res.status(401).json({error: 'bad token!'});

            else {
                const token = uuidv1();
                const tokenDeathTime = user.rememberMe
                    ? new Date().getTime() + (1000 * 60 * 60 * 24 * 7) // 7 day
                    : new Date().getTime() + (1000 * 60 * 60 * 24); // 1 day

                User.findByIdAndUpdate(user.id, {token, tokenDeathTime}, {new: true})
                    .then((newUser: IUser | null) => {
                        if (!newUser) res.status(500).json({error: 'not updated?'});

                        else res.status(200).json({...newUser._doc, name: user.email});
                    })
                    .catch(e => res.status(500).json({error: 'some error', e}))
            }
        })
        .catch(e => res.status(500).json({error: 'some error', e}));
});

export default auth;
