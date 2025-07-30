import express from 'express';
import { createClient } from '@supabase/supabase-js'
import env from 'dotenv';
env.config();

const supabase = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_KEY);
var router = express.Router();

router.get('/metros', async (req, res, next) => {
    const id = parseInt(req.query.state_id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid or missing state_id' });
    }
    console.log('Fetching metros for state_ud:', id);
    const { data, error } = await supabase
      .from("metro")
      .select("metro_id, metro_name")
      .eq("state_id", id)

    res.status(200).send(data);
    if (error) {
    console.log(error);
    }
  }
);

export default router;