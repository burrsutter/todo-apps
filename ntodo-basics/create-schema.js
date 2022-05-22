const pool = require("./pool");

const createTable = `
CREATE TABLE IF NOT EXISTS todo (
    id        SERIAL PRIMARY KEY,
    title     VARCHAR(255),
    completed boolean,
    ordering  integer,
    url       VARCHAR(255)
);`;

try {
    pool.query(createTable);
    console.log('Database  Created');
} catch (err) {
    console.error(err.message);
}