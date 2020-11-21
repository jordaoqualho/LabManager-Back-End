const Laboratorio = require('../models/Laboratorio')
class HomeController {

    async index(req,res) {
        res.json({ api: "API LAB MANAGER" })
    }
}

module.exports = new HomeController()