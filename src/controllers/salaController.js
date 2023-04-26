//ajustar o método get no salaController.js
const salaModel = require('../models/salaModel');
exports.get=async()=>{
    let salas =await salaModel.listarSalas();
    return salas;
}


/*exports.get = ()=> {
    
    let salaModel = require('../models/salaModel');
    return salaModel.listarSalas();

}

exports.get=async(req,res)=> {
    return{"status":"ok", "controller":"Sala"};
}*/

