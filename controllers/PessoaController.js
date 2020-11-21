var Pessoa = require('../models/Pessoa');

class PessoaController {

    async create(req,res) {
        var {nome, email, senha} = req.body

        if (nome == undefined) {
            res.status = 400
            res.json({ err: "O nome é inválido" })
            return
        }

        if (email == undefined) {
            res.status = 400
            res.json({ err: "O email é inválido" })
            return
        }

        if (senha == undefined) {
            res.status = 400
            res.json({ err: "A senha é inválida" })
            return
        }

        let emailExists = await Pessoa.checkEmail(email)

        if (emailExists) {
            res.status = 406
            res.json({ err: "O email informado já existe" })
            return
        }

        await Pessoa.create({nome, email, senha})

        res.status = 200
        res.json(req.body)
    }

    async getAll(req,res) {
        res.status = 200
        let result = await Pessoa.getAll()
        res.json(result)
    }

    async getById(req, res) {}
}

module.exports = new PessoaController()