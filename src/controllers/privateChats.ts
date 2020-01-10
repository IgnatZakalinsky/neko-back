import express, {Request, Response} from 'express';

const privateChats = express.Router();
import PrivateChat, {IPrivateChat} from '../models/privateChat';
import User, {IUser} from '../models/user';

privateChats.get('/', async (req: Request, res: Response) => {
    PrivateChat.find()
        // .select('_id email')
        .then(pc =>
            res.status(200)
                .json({pc}))

        .catch(e => res.status(500).json({error: e.toString(), errorObject: e}));
});

privateChats.post('/', async (req: Request, res: Response) => {
    let find = false;

    User.findOne({token: req.body.token})
        .then((user: IUser | null) => {
            if (!user || user.tokenDeathTime < new Date().getTime())
                res.status(401).json({error: 'bad token!'});

            else {
                PrivateChat.findOne({user1Id: user._id, user2Id: req.body.userId})
                    .then((pc: IPrivateChat | null) => {
                        if (pc) {
                            find = true;
                            res.status(200).json({addedPrivateChat: pc, success: true, find: true});
                        }
                    });
                PrivateChat.findOne({user1Id: req.body.userId, user2Id: user._id})
                    .then((pc: IPrivateChat | null) => {
                        if (pc) {
                            find = true;
                            res.status(200).json({addedPrivateChat: pc, success: true, find: true});
                        }
                    });

                if (!find) PrivateChat.create({
                    user1Id: user._id,
                    user2Id: req.body.userId,
                    messages: []
                })
                    .then((pc: IPrivateChat) => res.status(201).json({addedPrivateChat: pc, success: true}))

                    .catch(e => res.status(500).json({error: e.toString(), errorObject: e}));
            }
        })
        .catch(e => res.status(500).json({error: e.toString(), errorObject: e}));
});

// auth.post('/login', async (req: Request, res: Response) => {
//     User.findOne({email: req.body.email})
//         .then((user: IUser | null) => {
//             if (!user) res.status(400).json({error: 'not correct email/password'});
//
//             else if (user.password !== req.body.password)
//                 res.status(400).json({error: 'not correct email/password'});
//
//             else {
//                 const token = uuidv1();
//                 const tokenDeathTime = req.body.rememberMe
//                     ? new Date().getTime() + (1000 * 60 * 60 * 24 * 7) // 7 day
//                     : new Date().getTime() + (1000 * 60 * 60 * 24); // 1 day
//
//                 User.findByIdAndUpdate(
//                     user.id,
//                     {token, tokenDeathTime, rememberMe: req.body.rememberMe},
//                     {new: true})
//                     .then((newUser: IUser | null) => {
//                         if (!newUser) res.status(500).json({error: 'not updated?'});
//
//                         else res.status(200).json({...newUser._doc, name: user.email});
//                     })
//                     .catch(e => res.status(500).json({error: 'some error', e}))
//             }
//         })
//         .catch(e => res.status(500).json({error: 'some error', e}));
// });
//
// auth.post('/forgot', async (req: Request, res: Response) => {
//     User.findOne({email: req.body.email})
//         .then((user: IUser | null) => {
//             if (!user) res.status(404).json({error: 'Email address not found'});
//
//             else res.status(200).json({error: "sorry, I can't send new password on your email"});
//         })
//         .catch(e => res.status(500).json({error: 'some error', e}));
// });
//
// auth.post('/me', async (req: Request, res: Response) => {
//     User.findOne({token: req.body.token})
//         .then((user: IUser | null) => {
//             if (!user || user.tokenDeathTime < new Date().getTime())
//                 res.status(400).json({error: 'bad token!'});
//
//             else {
//                 const token = uuidv1();
//                 const tokenDeathTime = user.rememberMe
//                     ? new Date().getTime() + (1000 * 60 * 60 * 24 * 7) // 7 day
//                     : new Date().getTime() + (1000 * 60 * 60 * 24); // 1 day
//
//                 User.findByIdAndUpdate(user.id, {token, tokenDeathTime}, {new: true})
//                     .then((newUser: IUser | null) => {
//                         if (!newUser) res.status(500).json({error: 'not updated?'});
//
//                         else res.status(200).json({...newUser._doc, name: user.email});
//                     })
//                     .catch(e => res.status(500).json({error: 'some error', e}))
//             }
//         })
//         .catch(e => res.status(500).json({error: 'some error', e}));
// });

export default privateChats;
