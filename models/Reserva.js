const knex = require("../database/connection");
const TABLE_NAME = 'reserva';

class Reserva {
    
    async create(reserva) {
        let {id_laboratorio, data, hora} = reserva
        try {
            await knex.insert({id_pessoa: 1, id_laboratorio, data, hora}).table(TABLE_NAME)
        } catch (err) {
            console.log(err)
        }
    }

    async getById(id) {
        try {
            return await knex.select('*').table(TABLE_NAME).where({id: id})
        } catch (err) {
            console.log(err)
        }
    }

    async getAll() {
        try {
            return await knex.select('*').table(TABLE_NAME)
        } catch (err) {
            console.log(err)
        }
    }

    async getByLaboratorio(id) {
        try {
            return await knex.select('*').table(TABLE_NAME).where({id_laboratorio: id})
        } catch (err) {
            console.log(err)
        }
    }

    async getByPessoa(id) {
        try {
            return await knex.select('*').table(TABLE_NAME).where({id_pessoa: id})
        } catch (err) {
            console.log(err)
        }
    }

    async getByData(data) {
        try {
            return await knex.select('*').table(TABLE_NAME).where({data: data})
        } catch (err) {
            console.log(err)
        }
    }

    async getByDataHora(data, hora) {
        try {
            return await knex.select('*').table(TABLE_NAME).where({data: data, hora: hora})
        } catch (err) {
            console.log(err)
        }
    }

    async getReservasFuturas() {
        try {
            return await knex.select('*').table(TABLE_NAME).where('data', '>=', new Date()).orWhereBetween('data', [0,6])
        } catch (err) {
            console.log(err);
        }
    }

    async getReservasFuturasByLaboratorio(id) {
        try {
            return await knex.select('*').table(TABLE_NAME).where({id_laboratorio: id}).andWhere(() => {
                this.where('data', '>=', new Date()).orWhereBetween('data', [0,6])
            })
        } catch (err) {
            console.log(err);
        }
    }

    async cancela(id) {
        try {
            return await knex.delete().where({id: id}).table(TABLE_NAME)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new Reserva()