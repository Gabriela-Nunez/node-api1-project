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

server.post('/api/users', async (req, res) => {
  const user = req.body
  if (!user.name || !user.bio) {
    res.status(400).json({
       message: "Please provide name and bio for the user", 
      })
  } else {
    User.insert(user)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error while saving the user to the database",
        err: err.message,
        stack: err.stack
      })
    })
  }
})

// server.put('/api/user/:id', async (req, res) => {
//   const { id } = req.params
//   const { name, bio } = req.body
//   User.update
// })


 

server.delete('/api/users/:id', async (req, res) => {
  try{
    const possibleUser = await User.findById(req.params.id)
    if (!possibleUser) {
      res.status(404).json({
      message: "The user with the specified ID does not exist", 
      })
    } else {
      const deltedUser = await User.remove(req.params.id)
      res.status(200).json(deltedUser)
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be retrieved",
      err: err.message,
      stack: err.stack
    })
  }
})