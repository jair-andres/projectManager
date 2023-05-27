var pqrsModel = {}

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var pqrsSchema = new Schema({
  idUsuario:String,
  email:String,
  nombre:String,
  asunto:String,
  observacion:String
})

const MyModel = mongoose.model("pqrs", pqrsSchema)

pqrsModel.Guardar = function(post, callback) {
  const instancia = new MyModel
  instancia.idUsuario = post.idUsuario
  instancia.email = post.email
  instancia.nombre = post.nombre
  instancia.asunto = post.asunto
  instancia.observacion = post.observacion

  instancia.save((error, creado) => {
      if (error) {
          console.log(error)
          return callback({state:false})
      }
      else {
          return callback({state:true})
      }
  })
}

module.exports.pqrsModel = pqrsModel
