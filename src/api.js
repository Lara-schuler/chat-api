const express  = require("express");
const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());

const router = express.Router();
app.use('/', router.get('/', (req,res) => {
    res.status(200).send("<h1>API - CHAT</h1>")
}))

app.use('/sobre', router.get('/sobre', (req, res, next) =>{
    res.status(200).send({
        "name": "chat-api",
        "version": "1.0.0",
        "author": "Lara Schüler"
    })
}));

app.use('/salas', router.get('/salas', (req, res, next) => {
    const salaController = require("./controllers/salaController");
    let resp=salaController.get();
    res.status(200).send(resp);
}))

module.exports=app;