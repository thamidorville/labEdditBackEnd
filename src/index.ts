import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './router/userRouter'
import { postRouter } from './router/postRouter'
import { commentRouter } from './router/commentRouter'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT) || 3003, () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`)
})

// routers das entidades
app.use('/users', userRouter) //toda requisição users será reenviada para userRouter
app.use('/posts', postRouter)
app.use('/comments', commentRouter)

//endpoint ping de teste
app.get('/ping', (req, res) => {
    res.send('pong! tá funcionando!')
})

