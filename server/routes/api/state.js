import express from 'express';
import { getStates } from '../../db/db.js';

var router = express.Router();

router.get('/states', async (req, res, next) => {
  try {
    const id = parseInt(req.query.country_id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid or missing country_id' });
    }
    console.log('Fetching states for country_id:', id);
    const states = await getStates(id);
    res.status(200).send(states);
  } catch (err) {
    next(err);
  }
});

export default router;