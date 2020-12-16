const mongoose = require('mongoose')

const Schema = mongoose.Schema

let EventoSchema = new Schema({
  userId: { type: String, required: true},
  titulo: { type: String, required: true },
  fecha_inicio: { type: Date, required: true},
  fecha_finalizacion: { type: Date},
  dia_completo: Boolean
})

let EventoModel = mongoose.model('Evento', EventoSchema)

module.exports = EventoModel
