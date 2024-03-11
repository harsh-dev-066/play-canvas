import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOSTNAME,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export default pool;
