import {Request, Response, Router} from "express";
import PrivateChat, {IPrivateChat} from "../pc-2-models/privateChat"
import Message, {IMessage} from "../pc-2-models/message"
import {IUser} from "../../f-1-auth/a-2-models/user";
import {findUserByToken} from "../../f-1-auth/findUserByToken";

export const privateChatMessagesPost = (path: string, privateChat: Router) =>

    privateChat.post(path, async (req: Request, res: Response) => {

        const f = async (user: IUser) => {

            PrivateChat.findById(req.body.chatId)
                .exec()
                .then((pc: IPrivateChat | null) => {
                    if (!pc) res.status(400).json({error: 'bad chatId!'});

                    else if (!user._id.equals(pc.user1Id) && !user._id.equals(pc.user2Id))
                        res.status(401).json({error: 'bad userId!'});

                    else {

                        Message.create({
                            chatId: pc._id,
                            authorId: user._id,

                            message: req.body.message
                        })
                            .then((m: IMessage) => {

                                PrivateChat.findByIdAndUpdate(
                                    req.body.chatId, {messages: [...pc.messages, m._id]}, {new: true}
                                ).exec()
                                    .then(npc => res.status(201)
                                        .json({updatedPrivateChat: npc, addedMessage: m}))

                                    .catch(e => res.status(500)
                                        .json({
                                            error: 'some error',
                                            errorObject: e,
                                            in: 'privateChatMessagesPost/PrivateChat.findByIdAndUpdate'
                                        }));
                            })

                            .catch(e => res.status(500)
                                .json({
                                    error: 'some error',
                                    errorObject: e,
                                    in: 'privateChatMessagesPost/Message.create'
                                }));
                    }
                })
                .catch(e => res.status(500)
                    .json({
                        error: 'some error',
                        errorObject: e,
                        in: 'privateChatMessagesPost/PrivateChat.findById'
                    }));
        };

        findUserByToken(req, res, req.body.token, f, 'privateChatMessagesPost');
    });