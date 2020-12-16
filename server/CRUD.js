var User = require('./models.js')

// module.exports.insertarRegistro = function(db, callback) {
// let coleccion = db.collection("users")
//   coleccion.insertMany([
//     {nombre: "David", edad: 25, peso: 75},
//     {nombre: "Steven", edad: 35, peso: 80},
//     {nombre: "Fernando", edad: 40, peso: 68}
//   ], (error, result) => {
//     console.log("Resultado de insert: " + result.toString())
//   })
// }

module.exports.insertarRegistro = function(callback) {
  let Mateo = new User({nombre: "Mateo", edad: 28, peso: 90})
  Mateo.save((error)=>{
    if(error) callback(error)
    callback(null,"Registro guardado")
  })
}

// module.exports.eliminarRegistro = function(db, callback) {
//   let coleccion = db.collection("users")
//   try {
//     coleccion.deleteOne({edad:40})
//     console.log("Se elimino el registro correctamente")
//   }catch(e){
//     console.log("Se genero un error: " + e)
//   }
// }

module.exports.eliminarRegistro = function(callback) {
  User.remove({edad:35}, (error) => {
    if(error) callback(error)
    callback(null, "Se eliminó correctamente el registro")
  })
}

// module.exports.consultarYActualizar = function(db, callback){
//   let coleccion = db.collection("users")
//   coleccion.find().toArray((error, documents) => {
//     if (error) console.log(error)
//     console.log(documents)
//     callback()
//   })
//   try{
//     coleccion.updateOne({nombre: "Steven"}, {$set: {peso: 100}})
//     console.log("Se ha actualizado el registro correctamente ")
//   }catch(e){
//     console.log("Error actualizando el registro: "+e)
//   }
//   coleccion.find().toArray((error, documents) => {
//     if (error) console.log(error)
//     console.log(documents)
//     callback()
//   })
// }

module.exports.consultarYActualizar = function(callback){
  User.find({}).exec((error,result)=>{
    if(error) callback(error)
    console.log(result)
    User.update({nombre: "Mateo"}, {peso: 40}, (error,result) => {
      if(error) callback(error)
      callback(null,result)
    })
  })
}
