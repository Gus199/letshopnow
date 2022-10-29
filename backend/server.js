
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMidleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'


dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)



const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)



// import path from 'path'
// import express from 'express'
// import dotenv from 'dotenv'
// import colors from 'colors'
// import connectDB from './config/db.js'
// import { notFound, errorHandler } from './middleware/errorMidleware.js'
// import userRoutes from './routes/userRoutes.js'
// import orderRoutes from './routes/orderRoutes.js'
// import productRoutes from './routes/productRoutes.js'



// dotenv.config()

// connectDB()

// const app = express()



// // Routes
// app.use('/api/products', productRoutes)
// app.use('/api/users', userRoutes)
// app.use('/api/orders', orderRoutes)

// // Serve Frontend 
// if(process.env.NODE_ENV === 'production') {
//     // Set build folder as static
//     app.use(express.static(path.join(__dirname, '../frontend/build')))

//     app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frondend', 'build', 'index.html'))
// } else {
//     app.get('/', (req, res) => {
//         res.status(201).json({message:'Welcome to the Inventory API'})
//     })
// }

// app.use(notFound)
// app.use(errorHandler)

// const PORT = process.env.PORT || 8000

// app.listen(PORT, console.log(`Server runing in ${process.env.NODE_ENV} on ${PORT}`.yellow.bold))