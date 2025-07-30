import express from 'express';
import { createClient } from '@supabase/supabase-js'
import env from 'dotenv';
env.config();

const supabase = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_KEY);
var router = express.Router();

router.get('/states', async (req, res, next) => {
    const id = parseInt(req.query.country_id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid or missing country_id' });
    }
    console.log('Fetching states for country_id:', id);
    const { data, error } = await supabase
      .from("state")
      .select("state_id, state_name")
      .eq("country_id", id)

    res.status(200).send(data);
  if (error) {
    console.log(error);
  }
});

export default router;