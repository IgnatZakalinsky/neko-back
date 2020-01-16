import {Request, Response} from "express";
import User, {IUser} from "./a-2-models/user";

export const findUserByToken = (req: Request, res: Response, f: (user: IUser) => void, inR: string) => {
    User.findOne({token: req.body.token})
        .exec()
        .then((user: IUser | null) => {
            if (!user || user.tokenDeathTime < new Date().getTime())
                res.status(401).json({error: 'bad token!'});

            else f(user);
        })
        .catch(e => res.status(500)
            .json({error: 'some error', errorObject: e, in: inR + '/findUserByToken/User.findOne'}));
};
