import {Request, Response, Router} from "express";
import {Types} from "mongoose";
import PrivateChat from "../pc-2-models/privateChat";
import User, {IUser} from "../../f-1-auth/a-2-models/user";
import {findUserByToken} from "../../f-1-auth/findUserByToken";

export const privateChatsGet = (path: string, privateChat: Router) =>

    privateChat.get(path, async (req: Request, res: Response) => {

        const f = (user: IUser) => {

            PrivateChat.find({$or: [{user1Id: user._id}, {user2Id: user._id}]})
                .exec()
                .then(pc => {
                    const ids: Types.ObjectId[] =
                        pc.reduce<Types.ObjectId[]>((acc, ipc) => [...acc, ipc.user1Id, ipc.user2Id], []);

                    User.find({'_id': {$in: ids}})
                        .select('_id email')
                        .exec()
                        .then(users =>
                            res.status(200).json({privateChats: pc, users}))

                        .catch(e => res.status(500)
                            .json({error: 'some error', errorObject: e, in: 'privateChatsGet/User.find'}));
                })
                .catch(e => res.status(500)
                    .json({error: 'some error', errorObject: e, in: 'privateChatsGet/PrivateChat.find'}));
        };

        findUserByToken(req, res, req.query.token, f, 'privateChatsGet');
    });