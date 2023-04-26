//serviço para geração e validação de tokens
const jtw = require('jsonwebtoken');

const checktoken = async (token, id, key) => {
    try {
        const decoded = await jwt.verify(token, key);
        console.log(decoded.id)
        return decoded;
    } catch (err) {
        return false;
    }
};

const setToken = async (id, key) => {
    console.log(id);
    if (id) {
        return jtw.sign({ id }, key, { expiresIn: 28800 });
    }
    return false;
}

module.exports = {
    checktoken,
    setToken,

};
