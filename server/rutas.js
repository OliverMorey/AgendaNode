const Users = require('./usuario.js')
const Router = require('express').Router()
const Events = require('./evento.js')
var userLogin = ""

//Validar login
Router.post('/login', function(req, res) {
    let usuario = req.body.user
    let password = req.body.pass
    Users.findOne({user: usuario}).exec(function(err, doc){
        if (err) {
            res.status(500)
            res.json(err)
        }
        if (doc) {
          if (doc.pass == password) {
            userLogin = doc._id
            res.send("Validado")
          } else {
            res.send("Incorrecto")
          }
        } else {
          res.send("Incorrecto")
        }
    })
})

//Obtener todos los eventos por usuario loggeado
Router.get('/all', function(req, res) {
    //Events.find({userId: "5f9ef5e3d266463374e7022a"}).exec(function(err, docs) {
    Events.find({userId: userLogin}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        if (docs) {
          let eventos = {'eventos' :[]}
          for(var i in docs){
            eventos.eventos.push({
              'id': docs[i]._doc._id,
              'title': docs[i]._doc.titulo,
              'start': docs[i]._doc.fecha_inicio,
              'end': docs[i]._doc.fecha_finalizacion
            })
          }
          res.json(eventos.eventos)
        }
    })
})

// Obtener un usuario por su id
Router.get('/', function(req, res) {
    let nombre = req.query.nombre
    Users.findOne({nombres: nombre}).exec(function(err, doc){
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(doc)
    })
})

// Agregar un evento al usuario loggeado
Router.post('/new', function(req, res) {
    let event = new Events({
        userId: userLogin,
        titulo: req.body.title,
        fecha_inicio: req.body.start,
        fecha_finalizacion: req.body.end,
        dia_completo: false
    })
    event.save(function(error, result) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        //console.log(result._id)
        //res.send("Registro guardado")
        res.json(result)
        //res.json(result)
    })
})

// Eliminar un evento por su id
Router.post('/delete/:id', function(req, res) {
    let uid = req.params.id
    //console.log(req.params.id)
    Events.remove({_id: uid}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro eliminado")
    })
})

// Actualizar un evento por su id
Router.post('/update/:id', function(req, res) {
    let uid = req.params.id
    //console.log(req.params.id + " " + req.body.ini + " " + req.body.fin)
    Events.update({_id: uid}, {fecha_inicio: req.body.ini, fecha_finalizacion: req.body.fin}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro actualizado")
    })
})

module.exports = Router
