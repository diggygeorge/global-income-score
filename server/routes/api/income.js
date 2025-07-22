import express from 'express';
import { getRpp, getLivingWage } from '../../db/db.js';

var router = express.Router();

router.get('/income', async (req, res, next) => {
try {
    const country = req.query.country;
    const state = req.query.state;
    const metro = req.query.metro;
    const rpp = await getRpp(country, state, metro);
    const wage = await getLivingWage(country)
    res.status(200).send([wage, rpp])
} catch (err) {
    next(err)
}
})

export default router;