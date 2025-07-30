import express from 'express';
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.DATABASE_URL,process.env.DATABASE_KEY);
var router = express.Router();

router.get('/metros', async (req, res, next) => {
  try {
    const id = parseInt(req.query.state_id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid or missing state_id' });
    }
    console.log('Fetching metros for state_ud:', id);
    const { data, error } = await supabase
      .from("metros")
      .select("metro_id, metro_name")
      .eq("state_id", id)

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export default router;