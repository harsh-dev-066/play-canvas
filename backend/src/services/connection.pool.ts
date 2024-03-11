

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    port: 24475,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'defaultdb',

});

export default pool