'use strict'

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = async function (fastify, opts) {

  // Read All
  fastify.get('/', async function (request, reply) {
    const todos = await prisma.todo.findMany({
    })
    reply.send(todos)
  })

  // Create a todo
  fastify.post('/', async function (request, reply) {
    const { title, completed } = request.body
    console.log ("title:" + title);
    console.log ("completed: " + completed);

    const result = await prisma.todo.create({
      data: {
        title,
        completed,
      },
    })
    reply.send(result)
  })

  // Delete a todo
  fastify.delete('/:id', async function (request, reply) {
      const { id } = request.params
      console.log("deleting: " + id)
    
      const todo = await prisma.todo.delete({
        where: {
          id: Number(id),
        },
      })
      reply.send(todo)

  })

  // Update a todo
  fastify.put('/:id', async function (request, reply) {
    const { id } = request.params
    console.log("update for:" + id)
    console.log("request.body:" + request.body.title)
    
    
    try {
        const updatedTodo = await prisma.todo.update({
            where: { id: Number(id) },
            data: { 
                completed: request.body.completed,
                ordering: request.body.ordering,
                title: request.body.title
             },
          })
          reply.send(updatedTodo)
    } catch (error) {
        res.send({ error: `Todo with ID ${id} does not exist in the database` })
    } // try
  }) // put

}
