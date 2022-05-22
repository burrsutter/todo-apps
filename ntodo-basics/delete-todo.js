const pool = require("./pool");

const deleteTodo = `DELETE FROM todo WHERE id = 2;`;

try {
    pool.query(deleteTodo);
    console.log('Todo  Deleted');
} catch (err) {
    console.error(err.message);
}