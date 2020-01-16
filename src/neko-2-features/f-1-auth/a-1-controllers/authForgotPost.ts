import {Request, Response, Router} from "express";
import User, {IUser} from "../a-2-models/user";

export const authForgotPost = (path: string, auth: Router) =>

    auth.post(path, async (req: Request, res: Response) => {
        User.findOne({email: req.body.email})
            .exec()
            .then((user: IUser | null) => {
                if (!user) res.status(404).json({error: 'Email address not found'});

                else res.status(500).json({error: "sorry, I can't send new password on your email"});
            })
            .catch(e => res.status(500)
                .json({error: 'some error', errorObject: e, in: 'authForgotPost/User.findOne'}));
    });
