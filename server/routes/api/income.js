import express from 'express';
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.DATABASE_URL,process.env.DATABASE_KEY);
var router = express.Router();

router.get('/income', async (req, res, next) => {
try {
    const country = req.query.country;
    const state = req.query.state;
    const metro = req.query.metro;

    let table = ""
    if (metro !== "undefined") {
        table = "metros"
    }
    else if (state !== "undefined") {
        table = "states"
    }
    else if (country !== "undefined") {
        table = "countries"
    }

    const { data, error } = await supabase
            .from(table)
            .select("rpp")

    res.status(200).send(data)
} catch (err) {
    next(err)
}
})

export default router;