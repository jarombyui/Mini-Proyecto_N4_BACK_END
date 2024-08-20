import express from 'express'
import morgan from "morgan"
import { PORT } from './config/config.js'
import routesUser from './Routes/users.routes.js'
import routesAuth from './Routes/auth.routes.js'
import { validCors } from './middleware/cors.js'
import { swaggerDocs } from '../swagger.js'

const app = express()
app.use(express.json())

app.use(morgan('dev'))
app.use(express.json())
app.use(validCors)
app.use('/api/user',routesAuth)
app.use('/api/user',routesUser)

swaggerDocs(app)
app.use('*', (req, res) => res.status(404).send('La ruta no existe'))

app.listen(PORT,()=>{console.log(`Servidor conectado http://localhost:${PORT}`)})