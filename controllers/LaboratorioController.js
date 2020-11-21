const Laboratorio = require('../models/Laboratorio');
class LaboratorioController {

    async create(req,res) {
        let {nome, capacidade, descricao, foto, dias_possiveis, horas_possiveis} = req.body

        if (nome == undefined || nome == "") {
            res.status = 400
            res.json({ err: "O nome é inválido" })
            return
        }
        
        if (capacidade == undefined || isNaN(capacidade) || capacidade <= 0) {
            res.status = 400
            res.json({ err: "A capacidade é inválida" })
            return
        }
        
        if (dias_possiveis == undefined || dias_possiveis == "" || dias_possiveis.length == 0) {
            res.status = 400
            res.json({ err: "Os dias são inválidos" })
            return
        }
        
        if (horas_possiveis == undefined || horas_possiveis == "" || horas_possiveis.length == 0) {
            res.status = 400
            res.json({ err: "Os horários são inválidos" })
            return
        }
        
        if (descricao == undefined || descricao == "") {
            descricao = "Laboratório de TI"
        }
        
        if (foto == undefined || foto == "") {
            foto = "https://www.wreducacional.com.br/img_cursos/prod/img_1230x644/educacao/professores-de-laboratorio-de-informatica.jpg"
        }

        let novoLab = {nome, capacidade, descricao, foto, dias_possiveis, horas_possiveis}
        await Laboratorio.create(novoLab)

        res.status = 200
        res.json(novoLab)
    }

    async update(req,res) {
        let {id, nome, capacidade, descricao, foto, dias_possiveis, horas_possiveis} = req.body
        let lab = {}
        if (id) {
            lab = Laboratorio.getById(id)
        } else if (nome) {

        }
    }

    async getAll(req,res) {
        res.status = 200
        let result = await Laboratorio.getAll()
        result.forEach(r => {
            r.dias_possiveis = r.dias_possiveis.split(',')
            r.horas_possiveis = r.horas_possiveis.split(',') 
        });
        res.json(result)
    }

    async getById(req, res) {
        let id = req.params.id
        if (isNaN(id)) {
            res.status = 400
            res.json({ err: "ID inválido" })
            return
        }

        let result = await Laboratorio.getById(id)
        if (result.length == 0) {
            res.status = 404
            res.json({ err: "Não existe laboratório com este ID" })
            return
        }

        res.status = 200
        res.json(result)
    }

    async getByNome(req, res) {
        let nome = req.params.nome
        if (!nome) {
            res.status = 400
            res.json({ err: "Nome inválido" })
            return
        }

        let result = await Laboratorio.getByNome(nome)
        if (result.length == 0) {
            res.status = 404
            res.json({ err: "Não existe laboratório com este nome" })
            return
        }

        result.forEach(r => {
            r.dias_possiveis = r.dias_possiveis.split(',')
            r.horas_possiveis = r.horas_possiveis.split(',')
        });

        res.status = 200
        res.json(result)
    }

    async getByData(req,res) {
        let { data } = req.body
        if (data == undefined || data == "") {
            res.status = 400
            res.json({ err: "Data inválida" })
            return
        }

        let result = await Laboratorio.getByData(data)
        if (result.length <= 0) {
            res.status = 404
            res.json({ err: "Não encontramos laboratórios livres para a data solicitada" })
            return
        }

        result.forEach(r => {
            r.dias_possiveis = r.dias_possiveis.split(',')
            r.horas_possiveis = r.horas_possiveis.split(',') 
        });

        res.status = 200
        res.json(result)
    }

    async getByHora(req,res) {
        let { hora } = req.body
        if (hora == undefined || hora == "") {
            res.status = 400
            res.json({ err: "Hora inválida" })
            return
        }

        let result = await Laboratorio.getByHora(hora)
        if (result.length <= 0) {
            res.status = 404
            res.json({ err: "Não encontramos laboratórios livres no horário solicitado" })
            return
        }

        result.forEach(r => {
            r.dias_possiveis = r.dias_possiveis.split(',')
            r.horas_possiveis = r.horas_possiveis.split(',') 
        });

        res.status = 200
        res.json(result)
    }

    async getByDataHora(req,res) {
        let { data, hora } = req.body
        if (data == undefined || data == "") {
            res.status = 400
            res.json({ err: "Data inválida" })
            return
        }

        if (hora == undefined || hora == "") {
            res.status = 400
            res.json({ err: "Hora inválida" })
            return
        }

        let result = await Laboratorio.getByDataHora(data,hora)
        if (result.length <= 0) {
            res.status = 404
            res.json({ err: "Não encontramos laboratórios livres para a data e hora solicitada" })
            return
        }

        result.forEach(r => {
            r.dias_possiveis = r.dias_possiveis.split(',')
            r.horas_possiveis = r.horas_possiveis.split(',') 
        });

        res.status = 200
        res.json(result)
    }

    async getByNomeDataHora(req,res) {
        let { nome, data, hora } = req.body
        if (!nome) {
            res.status = 400
            res.json({ err: "Nome inválido" })
            return
        }

        if (data == undefined || data == "") {
            res.status = 400
            res.json({ err: "Data inválida" })
            return
        }

        if (hora == undefined || hora == "") {
            res.status = 400
            res.json({ err: "Hora inválida" })
            return
        }

        let result = await Laboratorio.getByNomeDataHora(data,hora)
        if (result.length <= 0) {
            res.status = 404
            res.json({ err: "Não encontramos laboratórios livres para a data e hora solicitada" })
            return
        }

        result.forEach(r => {
            r.dias_possiveis = r.dias_possiveis.split(',')
            r.horas_possiveis = r.horas_possiveis.split(',') 
        });

        res.status = 200
        res.json(result)
    }
}

module.exports = new LaboratorioController()