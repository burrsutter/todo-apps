const pool = require("./pool");

const updateTodo = `UPDATE todo SET
   title = 'More JavaScript',
   completed = true, 
   ordering = 1;`;

try {
    pool.query(updateTodo);
    console.log('Todo  Updated');
} catch (err) {
    console.error(err.message);
}