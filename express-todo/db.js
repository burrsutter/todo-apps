const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER || "todo",
  password: process.env.DB_PASS || "todo",
  database: process.env.DB_NAME || "todo",
  host: process.env.DB_HOST || "todo",
  port: process.env.DB_PORT || 5432
})

console.log("Database Connection Parameters: ");
console.log("USER: " + process.env.DB_USER);
console.log("PASS: " + process.env.DB_PASS);
console.log("NAME: " + process.env.DB_NAME);
console.log("HOST: " + process.env.DB_HOST);
console.log("PORT: " + process.env.DB_PORT);

module.exports = pool;
