import {Request, Response, Router} from "express";
import PrivateChat, {IPrivateChat} from "../pc-2-models/privateChat"
import Message, {IMessage} from "../pc-2-models/message"
import {IUser} from "../../f-1-auth/a-2-models/user";
import {findUserByToken} from "../../f-1-auth/findUserByToken";

export const privateChatMessagesGet = (path: string, privateChat: Router) =>

    privateChat.get(path, async (req: Request, res: Response) => {

        const f = (user: IUser) => {

            PrivateChat.findById(req.query.chatId)
                .exec()
                .then((pc: IPrivateChat | null) => {
                    if (!pc) res.status(400).json({error: 'bad chatId!'});

                    else if (!user._id.equals(pc.user1Id) && !user._id.equals(pc.user2Id))
                        res.status(401).json({error: 'bad userId!'});

                    else {

                        Message.find({'_id': {$in: pc.messages}})
                            .exec()
                            .then((ms: IMessage[]) => res.status(200).json({messages: ms}))

                            .catch(e => res.status(500)
                                .json({
                                    error: 'some error',
                                    errorObject: e,
                                    in: 'privateChatMessagesGet/Message.find'
                                }));
                    }
                })
                .catch(e => res.status(500)
                    .json({
                        error: 'some error',
                        errorObject: e,
                        in: 'privateChatMessagesGet/PrivateChat.findById'
                    }));
        };

        findUserByToken(req, res, req.query.token, f, 'privateChatMessagesGet');
    });