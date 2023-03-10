// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()

module.exports = server; // EXPORT YOUR SERVER instead of {}

server.use(express.json())

//ENDPOINTS
//GET
server.get('/api/users', async (req, res) => {
  User.find()
  .then(users => {
    res.json(users)
  })
  .catch(err => {
    res.status(500).json({
      message: "The users information could not be retrieved",
      err: err.message,
      stack: err.stack
    })
  })
})

server.get('/api/users/:id', async (req, res) => {
  const { id } = req.params
  User.findById(id)
    .then(user => {
      if(!user) {
        !user
    res.status(404).json({
      message: "The user with the specified ID does not exist", 
    })
      } 
      res.json(user)
    })
  .catch(err => {
    res.status(500).json({
      message: "The user with the specified ID does not exist",
      err:err.message,
      stack: err.stack
    })
  })
})