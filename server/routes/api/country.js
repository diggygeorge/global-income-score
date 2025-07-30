import express from 'express';
import { createClient } from '@supabase/supabase-js'
import env from 'dotenv';
env.config();

const supabase = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_KEY);

var router = express.Router();

router.get('/countries', async (_, res, next) => {
    const { data, error } = await supabase.from("country").select();
    res.status(200).send(data);
  if (error) {
    console.log(error)
  }
})

export default router;