import express from 'express';
import { getCountries } from '../../db/db.js';

var router = express.Router();

router.get('/countries', async (req, res, next) => {
  try {
    const countries = await getCountries();
    res.status(200).send(countries);
  } catch (err) {
    next(err)
  }
})

export default router;