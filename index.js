import express from 'express'
// import colors from 'colors'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/userRoute.js';
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoutes.js'
import cors from  'cors'
import 'dotenv/config'


const app = express();

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/products', productRoute)

connectDB();
const port = process.env.PORT || 8080;

app.get('/', (req, res)=>{
    res.send("<h1>Welcome to my ECommerce App</h1>")
})



app.listen(port, () => {
  console.log(`Server is running on ${process.env.DEV_MODE} on port ${port}`.bgCyan.white);
});
