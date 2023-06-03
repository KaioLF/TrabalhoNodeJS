const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  nome: String,
  sobrenome: String,
  nascimento: Date,
  telefone: Number,
  endereco: String,
  cidade: String,
  estado: String,
  status: Boolean,
  fotoPerfil: { type: Buffer, contentType: String },
});

module.exports = mongoose.model('subscribers', subSchema);
