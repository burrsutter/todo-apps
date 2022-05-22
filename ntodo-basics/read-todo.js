const pool = require("./pool");

const readTodo = `SELECT * FROM todo`;

try {
    pool.query(readTodo), (error, data) => {
        if (error) {
            console.log(error);
            return;
        }
        for (let row of data.rows) {
            console.log(row);
        }
        pool.end();
    };    
    console.log('Todos found');
} catch (err) {
    console.error(err.message);
}