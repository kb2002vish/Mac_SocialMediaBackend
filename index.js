import express from 'express';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import authenticate from './middleware/authenticate.js';
//dotenv
import dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT;
const app = express();

//Parsers
app.use(bodyParser.json())
app.use(cookieParser())


app.get("/",authenticate,(req,res)=>{
    console.log(req.session.auth);
    res.send("Server is running")
})

app.listen(PORT,()=>{
    console.log("Server is running at PORT", PORT);
})