import * as dotenv from 'dotenv'

import express from 'express'
import cors from 'cors'
import * as task from './controllers/task'
import * as user from './controllers/user'
import * as log from './controllers/log'
import { isLogged } from './libs/middlewareLogin'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 3000

app.use(express.static('www'))

//Users routes

app.post('/login', user.login)
app.post('/register', user.register)

//Task routes

app.get('/task', isLogged, task.list)
app.get('/task/:id', isLogged, task.get)
app.post('/task', isLogged, task.create)
app.put('/task/:id', isLogged, task.update)
app.delete('/task/:id', isLogged, task.remove)

//Logs routes

app.get('/logs', isLogged, log.list)

app.listen(PORT, () => {
  console.log(`⚡️[server]: API rodando em http://localhost:${PORT}`)
})
