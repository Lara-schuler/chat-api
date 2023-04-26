const express  = require("express");
const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());

const router = express.Router();
app.use('/', router.get('/', (req,res) => {
    res.status(200).send("<h1>API - CHAT</h1>")
}))

//informações sobre a API
app.use('/sobre', router.get('/sobre', (req, res, next) =>{
    res.status(200).send({
        "name": "chat-api",
        "version": "1.0.0",
        "author": "Lara Schüler"
    })
}));

//rota para listar as salas
app.use('/salas', router.get('/salas', async (req, res, next) => {
    const salaController = require("./controllers/salaController");
    let resp=await salaController.get();
    res.status(200).send(resp);
}));

// rota para entrar no CHAT
app.use('/entrar', router.post('/entrar', async(req,res,next) =>{
    const usuarioController = require('./controllers/usuarioController');
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));



module.exports=app;