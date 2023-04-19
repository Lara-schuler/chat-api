exports.get = ()=> {
    
    let salaModel = require('../model/salaModel');
    return salaModel.listarSalas();

}

