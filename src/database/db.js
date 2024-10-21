const Pool = require("pg").Pool

const pool = new Pool({
    user:'aisthetic',
    password:'noormohammed789',
    host:'localhost',
    port:5432,
    database:'postgres'
})

module.exports = pool