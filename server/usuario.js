const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: String, required: true },
  pass: { type: String, required: true}
})

let UserModel = mongoose.model('Usuario', UserSchema)

module.exports = UserModel
