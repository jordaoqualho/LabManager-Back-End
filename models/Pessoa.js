const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const TABLE_NAME = 'pessoa';

class Pessoa {

    async create(user) {
        let {nome, email} = user
        try {
            let senha = await bcrypt.hash(user.senha, 10);
            await knex.insert({nome,email,senha,cargo:0}).table(TABLE_NAME)
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

    async checkEmail(email) {
        try {
            let result = await knex.select('*').from(TABLE_NAME).where({email: email})
            return result.length > 0
        } catch (err) {
            console.log(err);
            return false
        }
    }
}

module.exports = new Pessoa();