'use strict';

const db = require('../db');

function find (id) {
  return db.query('SELECT * FROM todo WHERE id = $1', [id]);
}

function findAll () {
  return db.query('SELECT * FROM todo');
}

function create (name, stock) {
  return db.query('INSERT INTO todo (name, completed) VALUES ($1, $2) RETURNING *', [name, completed]);
}

function update (options = {}) {
  return db.query('UPDATE todo SET name = $1, completed = $2 WHERE id = $3', [options.name, options.completed, options.id]);
}

function remove (id) {
  return db.query('DELETE FROM todo WHERE id = $1', [id]);
}

module.exports = {
  find,
  findAll,
  create,
  update,
  remove
};
