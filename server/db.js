const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "@NT310pe22",
  host: "localhost",
  port: 5432,
  database: "margerin",
});

module.exports = pool;
