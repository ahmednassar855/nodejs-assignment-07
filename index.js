import express from 'express'
import { dbConnection } from './databases/dbConnection.js';
import blogRouter from './src/modules/blog/blog.router.js';
import userRouter from './src/modules/user/user.router.js';


const app = express()
const port = 3000

app.use(express.json()) // very important dont forget it to translate buffer




app.use('/api/users' ,userRouter)
app.use('/api/blogs' ,blogRouter)

dbConnection()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))