import express from 'express'
import {fileStore} from "../bd/fileFake";

const router = express.Router();

router.get('/', async (req: any, res: any) => {
    const file = fileStore.getFile64(req.query.n);

    if (file) res.send(JSON.stringify(file));
    else res.send(404);
});
router.post('/', async (req: any, res: any) => {
    let success = {success: false};
    if (req.body.file64) success = fileStore.addFile64(req.body.file64);
    else {
        // save file.jpg
    }

    if (success) res.send(JSON.stringify(success));
    else res.send(404);
});

export default router;
