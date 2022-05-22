const pool = require("./pool");

const createTodo = `INSERT INTO todo (title, completed, ordering) 
   VALUES ('Love JavaScript', false, 0)
   RETURNING *;`;

try {
    pool.query(createTodo);
    console.log('Todo  Created');
} catch (err) {
    console.error(err.message);
}