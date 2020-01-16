import {Request, Response, Router} from "express";
import User, {IUser} from "../a-2-models/user";
import {emailValidator, passwordValidator} from "../validators";

export const authRegisterPost = (path: string, auth: Router) =>

    auth.post(path, async (req: Request, res: Response) => {
        if (!emailValidator(req.body.email))
            res.status(400).json(
                {
                    error: 'Email not valid! /^[\\w]{1}[\\w-\\.]*@[\\w-]+\\.[a-z]{2,7}$/i.test(\'x@x.xx\')',
                    email: req.body.email
                });
        else if (!passwordValidator(req.body.password))
            res.status(400)
                .json({
                    error: 'Password not valid! must be more than 7 characters...',
                    password: req.body.password
                });

        else User.create({
                email: req.body.email,
                password: req.body.password,
                rememberMe: false,
                isAdmin: false
            })
                .then((user: IUser) => res.status(201).json({addedUser: user, success: true}))

                .catch(e => res.status(400)
                    .json({
                        error: 'email address already exists',
                        errorObject: e,
                        in: 'authRegisterPost/User.create'
                    }));
    });
