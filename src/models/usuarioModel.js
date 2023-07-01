//criando controller
const db = require('./db');

async function registrarUsuario(nick){ 
    return await db.insertOne('usuarios', {'nick': nick});

}

let buscarUsuario = async (idUser)=>{
    let user = await db.findOne('usuarios',idUser);
    console.log(user)
    return user;
}

let alterarUsuario = async (user)=>{
    return await db.updateOne('usuarios', user,{_id:user._id});
}
let excluirUsuario = async (idUser)=>{  
    return await db.deleteOne('usuarios',idUser);   
}

// precisa de uma função para excluir o usuário depois que ele sai do chat?

module.exports = {registrarUsuario, buscarUsuario, alterarUsuario, excluirUsuario}