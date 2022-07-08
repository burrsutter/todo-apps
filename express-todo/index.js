const express = require('express');
const { application_name } = require('pg/lib/defaults');
const app = express();
require('dotenv').config()
const pool = require("./db");
const path = require('path');

app.use(express.json());

// static page serving
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", async(req,res,next) => {
  res.render('index');
})

// get all todos
app.get("/api", async(req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM todo");
      res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get a todo
app.get("/api/:id", async(req, res) => {    
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
        res.json(todo.rows[0]);
      } catch (err) {
          console.error(err.message);
      }  
})

// create a todo
app.post("/api", async(req, res) => {
    try {      
      const { title } = req.body;
      const { completed } = req.body;
      console.log(title + ' ' + completed);
      const newTodo = 
      await pool.query("INSERT INTO todo (title, completed) VALUES ($1, $2) RETURNING *",
       [title, completed]);
      res.json(newTodo.rows[0]); 
    } catch (err) {
      console.error(err.message);
    }
})

// update a todo
app.patch("/api/:id", async(req, res) => {    
    try {
        const { id } = req.params;
        const { title } = req.body;
        const { completed } = req.body;
        const todo = await pool.query("UPDATE todo SET title = $1, completed = $2 WHERE id = $3", 
         [title, completed, id]);
        res.json("Updated");        
      } catch (err) {
          console.error(err.message);
      }  
})

// delete a todo
app.delete("/api/:id", async(req, res) => {    
    try {
        const { id } = req.params;
        const todo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);
        res.json("Deleted");
      } catch (err) {
          console.error(err.message);
      }  
})


var port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('my app listening on port Burr ' + port + '!');
});

  