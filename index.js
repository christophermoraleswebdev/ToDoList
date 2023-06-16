const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = 3001 
const Todo = require('./models/todo')


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose
      .connect('mongodb://127.0.0.1:27017/todoDB')
      .then(() => {
      console.log('Successfully connected to MongoDB.')
      })
      .catch((e) => {
      console.error('Connection error', e.message)
      })

app.get('/', (req, res) => {
      Todo.find()
      .then( result => {
            res.render('index', { data: result })
            console.log(result)
      })
})

app.post('/', (req, res) => {
      const todo = new Todo({
            todo: req.body.todoValue
      })
      todo.save()
      .then(result => {
            res.redirect('/')
      })
})

app.delete('/:id', (req, res) => {
      Todo.findByIdAndDelete(req.params.id)
      .then(result => {
            console.log(result)
      })
})


app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`)
})