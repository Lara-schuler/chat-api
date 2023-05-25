const express = require("express");
const token = require('./util/token')
const salaController = require('./controllers/salaController')
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();
app.use('/', router.get('/', (req, res) => {
    res.status(200).send("<h1>API - CHAT</h1>")
}))

//informações sobre a API
app.use('/sobre', router.get('/sobre', (req, res, next) => {
    res.status(200).send({
        "name": "chat-api",
        "version": "1.0.0",
        "author": "Lara Schüler"
    })
}));

// rota para entrar no CHAT
app.use('/entrar', router.post('/entrar', async (req, res, next) => {
    const usuarioController = require('./controllers/usuarioController');
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

//rota para listar as salas
app.use('/salas', router.get('/salas', async (req, res, next) => {
    if (await
        token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)
    ) {
        let resp = await salaController.get();
        res.status(200).send(resp);
    } else{
        res.status(400).send({msg:"Usuário não autorizado"})
    }


}));

// rota para entrar na sala
app.use('/sala/entrar', router.put('/sala/entrar', async (req, res) => {
    if(!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
    return false;

    console.log(req.headers);
    let resp = await salaController.entrar(req.headers.iduser, req.query.idSala);
    res.status(200).send(resp);

}))

// enviar mensagens
app.use('/sala/mensagem/', router.post('/sala/mensagem', async (req, res) => {
    if(!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
    return false;
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idSala);
    res.status(200).send(resp);
}))

// listar mensagens
app.use('/sala/mensagens/', router.get('/sala/mensagens', async (req, res)=>{
    if(!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
    return false;
    let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);
}))





module.exports = app;