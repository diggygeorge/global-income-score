import express from 'express';
import { getStates } from '../../db/db.js';

var router = express.Router();

router.get('/states', async (req, res, next) => {
try {
    const country = req.query.country;
    const states = await getStates(country);
    res.status(200).send(states);
} catch (err) {
    next(err)
}
})

export default router;