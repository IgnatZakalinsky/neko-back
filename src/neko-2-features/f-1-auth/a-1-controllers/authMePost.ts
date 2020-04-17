import {Request, Response, Router} from "express";
import User, {IUser} from "../a-2-models/user";
import uuidv1 from "uuid/v1";
import {findUserByToken} from "../findUserByToken";

export const authMePost = (path: string, auth: Router) =>

    auth.post('/me', async (req: Request, res: Response) => {
        const f = (user: IUser) => {
            const token = uuidv1();
            const tokenDeathTime = user.rememberMe
                ? new Date().getTime() + (1000 * 60 * 60 * 24 * 7) // 7 day
                : new Date().getTime() + (1000 * 60 * 60 * 24); // 1 day

            User.findByIdAndUpdate(user._id, {token, tokenDeathTime}, {new: true})
                .then((newUser: IUser | null) => {
                    if (!newUser) res.status(500).json({error: 'not updated?', in: 'authMePost'});

                    else {
                        console.log('IUser?: ', {...newUser});
                        res.status(200).json({...newUser._doc, name: user.email}); // _doc
                    }
                })
                .catch(e => res.status(500)
                    .json({error: 'some error', errorObject: e, in: 'authMePost/User.findByIdAndUpdate'}))
        };

        findUserByToken(req, res, req.body.token, f, 'authMePost');
    });
