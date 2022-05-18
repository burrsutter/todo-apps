'use strict';

const express = require('express');
/* eslint new-cap: "warn" */
const router = express.Router();

const todo = require('../api/todo');

router.get('/', (request, response) => {
  todo.findAll().then(results => {
    response.send(results.rows);
  }).catch(error => {
    console.log(error);
    response.sendStatus(400);
  });
});

router.get('/:id', (request, response) => {
  const { id } = request.params;

  todo.find(id).then(result => {
    if (result.rowCount === 0) {
      response.status(404);
      return response.send(`Item ${id} not found`);
    }

    return response.send(result.rows[0]);
  }).catch(() => {
    response.sendStatus(400);
  });
});


router.post('/', (request, response) => {
  const { name, completed } = request.body;
  return todo.create(name, completed).then(result => {
    response.status(201);
    return response.send(result.rows[0]);
  }).catch(error => {
    response.status(400);
    response.send(error);
  });
});

router.put('/:id', (request, response) => {
  const { name, completed } = request.completed;
  const { id } = request.params;
  todo.update({ name, completed, id }).then(result => {
    if (result.rowCount === 0) {
      response.status(404);
      return response.send(`Unknown item ${id}`);
    }

    return response.sendStatus(204);
  }).catch(error => {
    response.status(400);
    response.send(error);
  });
});

router.delete('/:id', (request, response) => {
  const { id } = request.params;
  todo.remove(id).then(result => {
    if (result.rowCount === 0) {
      response.status(404);
      return response.send(`Unknown item ${id}`);
    }

    return response.sendStatus(204);
  }).catch(error => {
    response.status(400);
    response.send(error);
  });
});

module.exports = router;
