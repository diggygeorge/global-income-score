import express from 'express';
import { getIncome } from '../../db/db.js';

var router = express.Router();

router.get('/income', async (req, res, next) => {
try {
    const country = req.query.country;
    const state = req.query.state;
    const metro = req.query.metro;
    const income = await getIncome(country, state, metro);
    res.status(200).send(income);
} catch (err) {
    next(err)
}
})

export default router;