import express from 'express';
import { getMetros } from '../../db/db.js';

var router = express.Router();

router.get('/metros', async (req, res, next) => {
try {
    const state = req.query.state;
    const metros = await getMetros(state);
    res.status(200).send(metros);
} catch (err) {
    next(err)
}
})

export default router;