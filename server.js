import express from 'express' ;
const app=express();
import dotenv from 'dotenv';
dotenv.config()
import connectDB from  './db/connect.js'
import 'express-async-errors';
import morgan from 'morgan';

import authRouter from './routes/authRoutes.js'
import chercheurRouter from './routes/chercheursRoutes.js'

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js'

// import { Routes } from 'react-router-dom';

if (process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

app.use(express.json())


app.get('/',(req,res)=>{
   
    res.send('welcome')
})
app.get('/api/v1',(req,res)=>{
   
    res.json({msg:'api'})
})
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/researchers', authenticateUser,chercheurRouter)



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000 ;

const start  = async ()=>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port,()=>{
            console.log(`the server is listening on ${port}...`)
        });
    }
    catch(error){
        console.log(error)
    }
}
start()
