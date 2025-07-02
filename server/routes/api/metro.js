import express from 'express';
import { getMetros } from '../../db/db.js';

var router = express.Router();

router.get('/metros', async (req, res, next) => {
  try {
    const id = parseInt(req.query.state_id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid or missing state_id' });
    }
    console.log('Fetching metros for state_id:', id);
    const metros = await getMetros(id);
    res.status(200).send(metros);
  } catch (err) {
    next(err);
  }
});

export default router;