import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.DATABASE_URL,process.env.DATABASE_KEY);


export function getCountries() {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM country";
        connection.query(query, (err, rows) => {
            if (err) {
                return reject(err);
            }
            return resolve(rows);
        })
    })
}

export function getStates(country_id) {
  return new Promise((resolve, reject) => {
    const query = `SELECT state_id AS id, name FROM state WHERE country_id = ?`;
    connection.query(query, [country_id], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}


export function getMetros(state_id) {
    return new Promise((resolve, reject) => {  
        const query = `SELECT metro_id AS id, name FROM metro WHERE state_id = ?`;
        connection.query(query, [state_id], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        })
    })
}

export function getRpp(country, state, metro) {
    let query = `SELECT * FROM country`;
    if (metro !== "undefined") {
        query = `SELECT rpp FROM metro WHERE name = '${metro}'`;
    }
    else if (state !== "undefined") {
        query = `SELECT rpp FROM state WHERE name = '${state}'`;
    }
    else if (country !== "undefined") {
        query = `SELECT rpp FROM country WHERE name = '${country}'`;
    }
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) {
                return reject(err);
            }
            return resolve(rows);
        })
    })
}

export function getLivingWage(country_name) {
    return new Promise((resolve, reject) => {
        const query = `SELECT living_wage FROM country WHERE name = '${country_name}'`;
        connection.query(query, (err, rows) => {
            if (err) {
                return reject(err);
            }
            return resolve(rows);
        })
    })
}