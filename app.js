import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import { notFound, errorHandler } from './middleware/errorHandling.js'
import cookieParser from 'cookie-parser'
import productRouter from './routes/product.js'
import orderRouter from './routes/order.js'
import helmet from 'helmet'
import ExpressMongoSanitize from 'express-mongo-sanitize'

dotenv.config()

const app = express()
const port = 3000

app.use(express.json())
app.use(helmet())
app.use(ExpressMongoSanitize())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))

app.use('/api/auth', authRouter)
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

mongoose.connect(process.env.DATABASE_URL, {

}).then(() => {
    console.log("Database Connect");
}).catch((err) => {
    console.log(err);
})