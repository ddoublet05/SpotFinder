import * as mysql from "mysql2/promise";

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'express',
    password: 'Azerty123',
    database: 'parking'
})