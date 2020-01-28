import {Express, Request, Response} from "express";
import auth from "../neko-2-features/f-1-auth";
import users from "../neko-2-features/f-2-users";
import privateChats from "../neko-2-features/f-3-private-chats";
import shop from "../neko-2-features/f-4-shop/index";
// import file from "../controllers/file";

export const routes = (app: Express) => {
    // routes
    app.use('/auth', auth);
    app.use('/users', users);
    app.use('/private-chats', privateChats);

    app.use('/shop', shop);

    // app.use('/file', file);

    //default
    app.use((req: Request, res: Response) => {
        console.log('bad url: ', req.method, req.url);
        res.send(404);
    });
};
