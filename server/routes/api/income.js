import express from 'express';
import { createClient } from '@supabase/supabase-js'
import env from 'dotenv';
env.config();

const supabase = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_KEY);
var router = express.Router();


router.get('/income', async (req, res, next) => {
    const country = req.query.country;
    const state = req.query.state;
    const metro = req.query.metro;

    let table = ""
    let query = ""
    if (metro !== "undefined") {
        table = "metro"
        query = metro
    }
    else if (state !== "undefined") {
        table = "state"
        query = state
    }
    else if (country !== "undefined") {
        table = "country"
        query = country
    }
    else {
        table = "country"
        query = "Canada"
    }
    console.log(table, query)
    const { data, error } = await supabase
            .from(table)
            .select("rpp")
            .eq(`${table}_name`, query)
    
    if (error) {
    console.log(error)
}
    return res.status(200).send(data)

})

export default router;