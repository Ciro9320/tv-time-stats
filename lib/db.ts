import mysql from "mysql2/promise";

declare global {
    var mysqlPool: mysql.Pool | undefined;
}

const dbOptions = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

const pool = global.mysqlPool || mysql.createPool(dbOptions);

if (process.env.NODE_ENV !== "production") {
    global.mysqlPool = pool;
}

export default pool;
