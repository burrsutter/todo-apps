const Pool = require("pg").Pool;

const pool = new Pool({
  user: "todo",
  password: "todo",
  database: "todo",
  host: "localhost",
  port: 5432
})

module.exports = pool;
