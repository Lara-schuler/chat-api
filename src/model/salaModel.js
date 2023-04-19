function listarSalas() {
    return [
        {
            "_id": {
                "$oid": "643f23e20e6258fe6dcbd21b"
            },
            "nome": "Guereiros da Info",
            "tipo": "publica"
        },
        {
            "_id": {
                "$oid": "643f23f30e6258fe6dcbd21d"
            },
            "nome": "Só os Confirmados",
            "tipo": "privada",
            "chave": "7dxy5p"
        },
        {
            "_id": {
                "$oid": "643f25930e6258fe6dcbd21f"
            },
            "nome": "teste",
            "tipo": "publica",
            "msg": [
                {
                    "msg": "Olá",
                    "nik": "Zé",
                    "timestamp": "17/08/2022 08:00:00"
                },
                {
                    "msg": "Blz, galera?",
                    "nik": "Zé",
                    "timestamp": "17/08/2022 08:01:00"
                },
                {
                    "msg": "Oi, Zé",
                    "nik": "Maria",
                    "timestamp": "17/08/2022 08:03:00"
                }
            ]
        }
    ]
}

module.exports = {listarSalas};