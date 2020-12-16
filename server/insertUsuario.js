var MongoClient = require('mongodb').MongoClient

var url = "mongodb://localhost/agenda"

var mongoose = require('mongoose')

var Schema = mongoose.Schema

let UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: String, required: true },
  pass: { type: String, required: true}
})

let UserModel = mongoose.model('Usuario', UserSchema)

mongoose.connect(url)

insertarRegistro = function(callback) {
  let NewUsuario = new UserModel({_id: new mongoose.Types.ObjectId(), user: "Oliver", pass: "1234"})
  NewUsuario.save((error)=>{
    if(error) callback(error)
    callback(null,"Registro guardado")
  })
}

insertarRegistro((error,result)=>{
   if(error) console.log(error)
   console.log(result)
})
