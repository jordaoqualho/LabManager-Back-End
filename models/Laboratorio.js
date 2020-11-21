const knex = require("../database/connection");
const TABLE_NAME = 'laboratorio';

class Laboratorio {

    async create(lab) {
        let {nome, capacidade, descricao, foto, dias_possiveis, horas_possiveis} = lab
        try {
            await knex.insert({nome,capacidade,descricao,foto,dias_possiveis,horas_possiveis}).table(TABLE_NAME)
        } catch (err) {
            console.log(err);
        }
    }

    async getAll() {
        try {
            return await knex.select('*').from(TABLE_NAME)
        } catch (err) {
            console.log(err);
        }
    }

    async getById(id) {
        try {
            let result = await knex.select('*').from(TABLE_NAME).where({id: id})
            return result
        } catch (err) {
            console.log(err)
        }
    }

    async getByNome(nome) {
        try {
            let result = await knex.select('*').from(TABLE_NAME).whereRaw('UPPER(nome) LIKE ?', `%${nome.replace(' ', '%')}%`)
            return result
        } catch (err) {
            console.log(err)
        }
    }

    async getByData(data) {
        console.log(data)
        if (isNaN(data)) {
            let tmp = data.split('/');
            let date = new Date(tmp[0], tmp[1], tmp[2]);
            data = date.getDay()
        }

        try {
            return await knex.select('*').from(TABLE_NAME).where('dias_possiveis', 'like', `%${data}%`)
        } catch (err) {
            console.log(err)
        }
    }

    async getByHora(hora) {
        try {
            return await knex.select('*').from(TABLE_NAME).where('horas_possiveis', 'like', `%${hora}%`)
        } catch (err) {
            console.log(err)
        }
    }

    async getByDataHora(data, hora) {
        console.log(data)
        if (isNaN(data)) {
            let tmp = data.split('/');
            let date = new Date(tmp[0], tmp[1], tmp[2]);
            data = date.getDay()
        }

        try {
            return await knex.select('*').from(TABLE_NAME).where('dias_possiveis', 'like', `%${data}%`)
                .andWhere('horas_possiveis', 'like', `%${hora}%`)
        } catch (err) {
            console.log(err)
        }
    }

    async getByNomeDataHora(nome,data,hora) {
        console.log(data)
        if (isNaN(data)) {
            let tmp = data.split('/');
            let date = new Date(tmp[0], tmp[1], tmp[2]);
            data = date.getDay()
        }

        try {
            return await knex.select('*')
                .from(TABLE_NAME)
                .whereRaw('UPPER(nome) LIKE ?', `%${nome.replace(' ', '%')}%`)
                .andWhere('dias_possiveis', 'like', `%${data}%`)
                .andWhere('horas_possiveis', 'like', `%${hora}%`)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new Laboratorio();