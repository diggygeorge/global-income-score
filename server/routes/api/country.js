import express from 'express';
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.DATABASE_URL,process.env.DATABASE_KEY);

var router = express.Router();

router.get('/countries', async (_, res, next) => {
  try {
    const { data, error } = await supabase.from("countries").select();
    res.status(200).send(data);
  } catch (error) {
    next(error)
  }
})

export default router;