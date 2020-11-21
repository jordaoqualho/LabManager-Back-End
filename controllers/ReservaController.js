const Laboratorio = require('../models/Laboratorio')
const Reserva = require('../models/Reserva')

class ReservaController {
    
    async create(req,res) {
        let {id_laboratorio, data, hora} = req.body

        if (!id_laboratorio) {
            res.status = 400
            res.json({ err: "Laboratório não informado" })
            return
        }

        if (!data) {
            res.status = 400
            res.json({ err: "Data não informada" })
            return
        }

        if (!hora) {
            res.status = 400
            res.json({ err: "Hora não informada" })
            return
        }

        // let pessoa = await Pessoa.getById(id_pessoa)
        
        let laboratorio = await Laboratorio.getById(id_laboratorio)
        laboratorio.forEach(r => {
            r.dias_possiveis = r.dias_possiveis.split(',')
            r.horas_possiveis = r.horas_possiveis.split(',') 
        })

        if (!laboratorio) {
            res.status = 400
            res.json({ err: "Laboratório informado não existe" })
            return
        }
        laboratorio = laboratorio[0];

        let diaDaSemana = 0;
        if (isNaN(data)) {
            let tmp = data.split('/');
            let date = new Date(tmp[0], tmp[1], tmp[2]);
            diaDaSemana = date.getDay()
        } else {
            diaDaSemana = data
        }

        if(laboratorio.dias_possiveis.filter(r => r == diaDaSemana).length == 0) {
            res.status = 400
            res.json({ err: "Laboratório não permite reservas para essa data" })
            return
        }

        if (laboratorio.horas_possiveis.filter(r => r == hora).length == 0) {
            res.status = 400
            res.json({ err: "Laboratório não permite reservas para esse horário" })
            return
        }

        let reservas = await Reserva.getByDataHora(data,hora)
        if (reservas.length > 0) {
            res.status = 400
            res.json({ err: "Laboratório já está reservado nesta data e hora" })
            return
        }

        await Reserva.create({id_laboratorio, data, hora})
        res.sendStatus(200)
    }

    async getAll(req, res) {
        let result = await Reserva.getAll()
        if (!result) {
            res.status = 404
            res.json({ err: "Não há reservas" })
            return
        }

        let labs = await Laboratorio.getAll()
        result.forEach(r => {
            r.laboratorio = labs.filter(l => l.id == r.id_laboratorio)
        })

        res.status = 200
        res.json(result)
    }

    async getById(req, res) {
        let id = req.params.id
        let result = await Reserva.getById(id)
        if (result.length == 0) {
            res.status = 404
            res.json({ err: "A reserva informada não existe" })
            return
        }

        res.status = 200
        res.json(result)
    }

    async getDataHoraReservadasByLaboratorio(req,res) {
        let id = req.params.id
        if (!id) {
            res.status = 400
            res.json({ err: "O laboratório informado não existe" })
            return 
        }
        let laboratorio = await Laboratorio.getById(id);
        if (laboratorio.length == 0) {
            res.status = 404
            res.json({ err: "O laboratório informado não existe" })
            return
        }
        let datasReservadas = []
        let result = await Reserva.getByLaboratorio(id)
        result.forEach(r => {
            datasReservadas.push({data: r.data, hora: r.hora});
        })

        res.status = 200
        res.json(datasReservadas)
    }

    async getByLaboratorio(req, res) {
        let id = req.params.id
        if (!id) {
            res.status = 400
            res.json({ err: "O laboratório informado não existe" })
            return 
        }
        let laboratorio = await Laboratorio.getById(id);
        if (laboratorio.length == 0) {
            res.status = 404
            res.json({ err: "O laboratório informado não existe" })
            return
        }
        let result = await Reserva.getByLaboratorio(id)
        res.status = 200
        res.json(result)
    }

    async cancelaReserva(req,res) {
        let id = req.params.id
        let reserva = await Reserva.getById(id)
        if (reserva.length == 0) {
            res.status = 404
            res.json({ err: "A reserva informada não existe" })
            return
        }

        await Reserva.cancela(id)
        res.sendStatus(200)
    }
}

module.exports = new ReservaController()