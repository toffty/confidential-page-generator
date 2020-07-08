import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser'
import UserController from "./controllers/UserController.js";
import PageController from "./controllers/PageController.js";
import AuthController from "./controllers/AuthController.js";
import dotenv from 'dotenv'
import authJwt from "./middlewares/authJWT.js";

const app = express();

dotenv.config();

app.set("view engine", "ejs");
const url = 'mongodb://localhost:27017/cpg';


const User = new UserController();
const Page = new PageController();
const Auth = new AuthController();

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})

app.use(bodyParser.json())


app.get("/user/:id", [authJwt], User.show)
app.delete("/user/:id", [authJwt], User.delete)
app.post("/user/registration", Auth.SignUp)
app.post("/user/login", Auth.SignIn)


app.post("/page/create", [authJwt], Page.create)
app.use("/page/:id", Page.show)





app.listen(process.env.PORT, () => {
    console.log('listening port 7777')
})