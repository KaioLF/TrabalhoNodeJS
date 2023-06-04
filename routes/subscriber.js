const express = require('express');
const router = express.Router();
const subController = require('../controllers/SubController');
const { upload } = require('../middlewares/upload');

router.get('/', subController.listar);
router.get('/filtro/:filtro/:valor', subController.listarPorFiltro);
router.post('/', upload.single('fotoPerfil'), subController.salvar);
router.get('/:id', subController.buscarPorId);
router.put('/:id', subController.atualizar);
router.delete('/:id', subController.excluir);

module.exports = router;