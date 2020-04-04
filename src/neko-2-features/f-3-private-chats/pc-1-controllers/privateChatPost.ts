import {Request, Response, Router} from "express";
import PrivateChat, {IPrivateChat} from "../pc-2-models/privateChat"
import {IUser} from "../../f-1-auth/a-2-models/user";
import {findUserByToken} from "../../f-1-auth/findUserByToken";

export const privateChatPost = (path: string, privateChat: Router) =>

    privateChat.post(path, async (req: Request, res: Response) => {

        const f = async (user: IUser) => {
            let find = false;
            let pc: IPrivateChat | null = null;

            try {
                pc = await PrivateChat.findOne({user1Id: user._id, user2Id: req.body.userId}).exec();
                if (pc) {
                    find = true;
                    res.status(200).json({addedPrivateChat: pc, success: true, find});
                }
                pc = await PrivateChat.findOne({user1Id: req.body.userId, user2Id: user._id}).exec();
                if (pc) {
                    find = true;
                    res.status(200).json({addedPrivateChat: pc, success: true, find});
                }
            } catch (e) {
                res.status(500)
                    .json({error: 'some error', errorObject: e, in: 'privateChatPost/PrivateChat.findOne'});
            }

            if (!find) PrivateChat.create({
                user1Id: user._id,
                user2Id: req.body.userId,
                messages: []
            })
                .then((pc: IPrivateChat) => res.status(201).json({addedPrivateChat: pc, success: true}))

                .catch(e => res.status(500)
                    .json({error: 'some error', errorObject: e, in: 'privateChatPost/PrivateChat.create'}));
        };

        findUserByToken(req, res, req.body.token, f, 'privateChatPost');
    });
