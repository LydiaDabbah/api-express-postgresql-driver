const { Pool } = require("pg")

const connect = new Pool({
  host:"localhost",
  user: "postgres",
  password: "Lydiadabbah1",
  database: "intro-backend",
  port: "5432"
})

module.exports = connect