import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Successfully connected to MySQL!');
  });

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

export function getIncome(country, state, metro) {
    let query = `SELECT * FROM country`;
    if (metro !== "") {
        query = `SELECT less_than_10000, from_10000_to_14999, from_15000_to_19999, from_20000_to_24999, from_25000_to_29999, from_30000_to_34999, from_35000_to_39999, from_40000_to_44999, from_45000_to_49999, from_50000_to_59999, from_60000_to_74999, from_75000_to_99999, from_100000_to_124999, from_125000_to_149999, from_150000_to_199999, over_200000, sample_population, rpp FROM metro WHERE name = '${metro}'`;
    }
    else if (state !== "") {
        query = `SELECT less_than_10000, from_10000_to_14999, from_15000_to_19999, from_20000_to_24999, from_25000_to_29999, from_30000_to_34999, from_35000_to_39999, from_40000_to_44999, from_45000_to_49999, from_50000_to_59999, from_60000_to_74999, from_75000_to_99999, from_100000_to_124999, from_125000_to_149999, from_150000_to_199999, over_200000, sample_population, rpp FROM state WHERE name = '${state}'`;
    }
    else if (country !== "") {
        query = `SELECT less_than_10000, from_10000_to_14999, from_15000_to_19999, from_20000_to_24999, from_25000_to_29999, from_30000_to_34999, from_35000_to_39999, from_40000_to_44999, from_45000_to_49999, from_50000_to_59999, from_60000_to_74999, from_75000_to_99999, from_100000_to_124999, from_125000_to_149999, from_150000_to_199999, over_200000, sample_population, rpp FROM country WHERE name = '${country}'`;
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