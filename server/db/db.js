
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

export function getStates(country_name) {
    return new Promise((resolve, reject) => {
        const query = `SELECT name FROM state WHERE country_name = '${country_name}'`;
        connection.query(query, (err, rows) => {
            if (err) {
                return reject(err);
            }
            return resolve(rows);
        })
    })
}

export function getMetros(state_name) {
    return new Promise((resolve, reject) => {
        const query = `SELECT name FROM metro WHERE state_name = '${state_name}'`;
        connection.query(query, (err, rows) => {
            if (err) {
                return reject(err);
            }
            return resolve(rows);
        })
    })
}

export function getIncome(country, state, metro) {
    if (metro !== "") {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM country WHERE name = ${metro}`;
            connection.query(query, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);
            })
        })
    }
    else if (state !== "") {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM state WHERE name = ${state}`;
            connection.query(query, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);
            })
        })
    }
    else if (country !== "") {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM country WHERE name = ${country}`;
            connection.query(query, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);
            })
        })
    }

}