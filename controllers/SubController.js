const subModel = require("../models/Subscriber");
const upload = require("../middlewares/upload");

class SubController {
  async salvar(req, res) {
    try {
      let subscriber = req.body;
      const max = await subModel.findOne({}).sort({ id: -1 });
      subscriber.id = max == null ? 1 : max.id + 1;

      if (req.file) {
        subscriber.fotoPerfil = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }

      const resultado = await subModel.create(subscriber);
      res.status(201).json(resultado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao salvar o assinante" });
    }
  }

  async listar(req, res) {
    try {
      const resultado = await subModel.find({});
      res.status(200).json(resultado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao listar os assinantes" });
    }
  }

  async listarPorFiltro(req, res) {
    try {
      const { filtro, valor } = req.params;
      let resultado;

      switch (filtro) {
        case "nome":
          resultado = await subModel.find({ nome: valor });
          break;
        case "sobrenome":
          resultado = await subModel.find({ sobrenome: valor });
          break;
        case "cidade":
          resultado = await subModel.find({ cidade: valor });
          break;
        case "estado":
          resultado = await subModel.find({ estado: valor });
          break;
        case "status":
          resultado = await subModel.find({ status: valor });
          break;
        default:
          return res.status(400).json({ message: "Filtro inválido" });
      }

      res.status(200).json(resultado);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro ao listar os assinantes por filtro" });
    }
  }

  async buscarPorId(req, res) {
    try {
      const id = req.params.id;
      const resultado = await subModel.findOne({ id: id });
      res.status(200).json(resultado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar o assinante por ID" });
    }
  }

  async atualizar(req, res) {
    try {
      const id = req.params.id;
      const _id = String((await subModel.findOne({ id: id }))._id);
      await subModel.findByIdAndUpdate(String(_id), req.body);
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar o assinante" });
    }
  }

  async excluir(req, res) {
    try {
      const id = req.params.id;
      const _id = String((await subModel.findOne({ id: id }))._id);
      await subModel.findByIdAndRemove(String(_id));
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao excluir o assinante" });
    }
  }
}

module.exports = new SubController();
