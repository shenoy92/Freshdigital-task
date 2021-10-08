import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js'
const app= express();
dotenv.config();

app.use(express.json()); 
app.use(express.urlencoded({extented:true}));
app.use(cors());

app.use('/user',userRoutes)
app.use('/post',postRoutes)

mongoose.connect(process.env.url,{useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => app.listen( process.env.PORT || 3200, () => console.log(`Server Running `)))
    .catch((error) => console.log(`${error} did not connect`));

const mongodbConnection = mongoose.connection;
mongodbConnection.on('open',function() {
    console.log('Mongo DB connected');
})
