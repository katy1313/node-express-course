const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connection')
require('dotenv').config()



//middleware
app.use(express.json())

//routes
app.get('/hello', (req, res) => {
    res.send('Task Manager App')
})

app.use('/api/v1/tasks', tasks)

// app.get('/api/v1/tasks', (req, res) => {})
// app.post('/api/v1/tasks', (req, res) => {})
// app.get('/api/v1/tasks/:id', (req, res) => {})
// app.patch('/api/v1/tasks/:id', (req, res) => {})
// app.delete('/api/v1/tasks/:id', (req, res) => {})

const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()


