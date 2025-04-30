import express from 'express';
import { getLivingWage } from '../../db/db.js';

var router = express.Router();

router.get('/livingwage', async (req, res, next) => {
  try {
    const country = req.query.country;
    const wage = await getLivingWage(country);
    res.status(200).send(wage);
  } catch (err) {
    next(err)
  }
})

export default router;