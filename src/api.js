const express = require("express");
const cors = require("cors")
const token = require('./util/token')
const salaController = require('./controllers/salaController')
const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Configurar a origem permitida, ou use o domínio específico da sua aplicação
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
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
    } else {
        res.status(400).send({ msg: "Usuário não autorizado" })
    }


}));

// rota para entrar na sala
app.use('/sala/entrar', router.put('/sala/entrar', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;

    console.log(req.headers);
    let resp = await salaController.entrar(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);

}))

// criar sala
app.use('/sala/criar', router.post('/sala/criar', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;

    // Extrair os dados necessários do corpo da requisição
    const { nome, tipo } = req.body;

    // Chamar o controlador para criar a sala
    let resp = await salaController.criarSala(req.headers.iduser, nome, tipo);
    res.status(200).send(resp);
}))


// enviar mensagens
app.use('/sala/mensagem/', router.post('/sala/mensagem', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idsala);
    res.status(200).send(resp);
}))

// listar mensagens
app.use('/sala/mensagens/', router.get('/sala/mensagens', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    let resp = await salaController.buscarMensagens(req.query.idsala, req.query.timestamp);
    res.status(200).send(resp);
}))

//sair da sala

app.use('/sala/sair', router.put('/sala/sair', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    console.log(req.headers);
    let resp = await salaController.sairSala(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
}));


// sair do chat
app.use('/sair', router.put('/sair', async (req, res) => {
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;

    const usuarioController = require('./controllers/usuarioController');
    let resp = await usuarioController.sairChat(req.headers.iduser);

    res.status(200).send(resp);
}));

module.exports = app;