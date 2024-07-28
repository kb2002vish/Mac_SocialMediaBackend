import express from 'express';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import authenticate from './middleware/authenticate.js';
//dotenv
import dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT;
const app = express();

//Maintaining session
import session from 'express-session';

const store  = new session.MemoryStore();
app.use(
    session({
        secret: process.env.SECRET,
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 60000 * 60,
        },
        store,
    })
);

//Parsers
app.use(bodyParser.json())
app.use(cookieParser())


app.get("/",authenticate,(req,res)=>{
    console.log(req.session.auth);
    res.send("Server is running")
})
//Routes
import userRoute from './routes/user.routes.js'
import postRoute from "./routes/post.routes.js"
app.use("/user",userRoute);
app.use("/post",authenticate,postRoute);

app.listen(PORT,()=>{
    console.log("Server is running at PORT", PORT);
})