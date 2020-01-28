import {Request, Response, Router} from "express";
import User from "../f-1-auth/a-2-models/user";

export const usersGet = (path: string, users: Router) =>

    users.get(path, async (req: Request, res: Response) => {
        User.find()
            .select('_id email')
            .exec()
            .then(users =>
                res.status(200).json({users}))

            .catch(e => res.status(500)
                .json({error: 'some error', errorObject: e, in: 'usersGet/User.find'}));
    });