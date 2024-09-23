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
import { v2 as cloudinary } from 'cloudinary';

dotenv.config()

const app = express()
const port = 3000

 // Configuration
 cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

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