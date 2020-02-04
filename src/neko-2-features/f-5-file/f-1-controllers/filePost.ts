import {Request, Response, Router} from "express";

export const filePost = (path: string, shop: Router) =>

    shop.post(path, async (req: Request, res: Response) => {


        res.status(200).json({answer: 'hz'});
    });