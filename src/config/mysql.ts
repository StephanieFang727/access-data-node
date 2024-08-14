// src/config/database.ts
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "1.94.138.172",
  user: "fang",
  password: "12345678",
  database: "mydb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
