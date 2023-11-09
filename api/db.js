const pgp = require("pg-promise")();
const connectionURL =
  "postgres://postgres:9585@localhost:5432/Todo-list";
const db = pgp(connectionURL);

module.exports = db;
