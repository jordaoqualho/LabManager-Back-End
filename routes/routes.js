var express = require("express")
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var PessoaController = require("../controllers/PessoaController");
var LaboratorioController = require("../controllers/LaboratorioController");
var ReservaController = require("../controllers/ReservaController");

router.get("/", HomeController.index);

// Pessoa
router.post('/pessoa', PessoaController.create);
router.get('/pessoa/:id', PessoaController.getById);
router.get('/pessoas', PessoaController.getAll);

// Laboratorio
router.post('/laboratorio', LaboratorioController.create);
router.get('/laboratorio/:id', LaboratorioController.getById);
router.get('/laboratorios', LaboratorioController.getAll);
router.get('/laboratorio/getByNome/:nome', LaboratorioController.getByNome);
router.post('/laboratorio/getByData', LaboratorioController.getByData);
router.post('/laboratorio/getByHora', LaboratorioController.getByHora);
router.post('/laboratorio/getByDataHora', LaboratorioController.getByDataHora);
router.post('/laboratorio/getByNomeDataHora', LaboratorioController.getByNomeDataHora);

// Reserva
router.post('/reserva', ReservaController.create);
router.get('/reservas', ReservaController.getAll);
router.get('/reserva/getByLaboratorio/:id', ReservaController.getByLaboratorio);
router.get('/reserva/getDataHoraReservadas/:id', ReservaController.getDataHoraReservadasByLaboratorio);
router.delete('/reserva/:id', ReservaController.cancelaReserva);

module.exports = router;