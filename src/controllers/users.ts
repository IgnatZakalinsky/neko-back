import express, {Request, Response} from 'express';

const users = express.Router();
import User, {IUser} from '../models/user';

users.get('/', async (req: Request, res: Response) => {
    User.find()
        .select('_id email')
        .then(users =>
            res.status(200).json({users}))

        .catch(e => res.status(500).json({error: e.toString(), errorObject: e, in: 'User.find'}));
});

export default users;
