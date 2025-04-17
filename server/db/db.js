
import mysql from 'mysql2';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'FalzarGaming123#',
  database: 'income_data'
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
        const query = "SELECT name FROM country";
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
        const query = `SELECT name FROM state WHERE country_id = ${country_id}`;
        connection.query(query, (err, rows) => {
            if (err) {
                return reject(err);
            }
            return resolve(rows);
        })
    })
}

export function getMetros(metro_id) {
    return new Promise((resolve, reject) => {
        const query = `SELECT name FROM state WHERE state_id = ${country_id}`;
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