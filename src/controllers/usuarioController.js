const token = require('../util/token');
const usuarioModel = require('../models/usuarioModel');

exports.entrar = async(nick) => {
    let resp = await usuarioModel.registrarUsuario(nick);
    if(resp.insertedId){
        return {
            'idUser':resp.insertedId,
            'token': await token.setToken(JSON.stringify(resp.insertedId).replace(/"/g,''),nick),
            'nick':nick
        }
    }
}

exports.sairChat = async (nick) => {
    // Lógica para tratar a saída do usuário do chat
    // atualizar o status do usuário, notificar outros participantes...
    // Exemplo: Remover o nick da lista de usuários ativos
  /*const usuariosAtivos = [...]; // lista de usuários ativos
  const index = usuariosAtivos.indexOf(nick);
  if (index > -1) {
    usuariosAtivos.splice(index, 1);
  }*/
  
    return `O usuário ${nick} saiu do chat.`;
};
