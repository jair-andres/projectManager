var pqrsModel = {}

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var pqrsSchema = new Schema({
  idUsuario:String,
  email:String,
  nombre:String,
  asunto:String,
  observacion:String,
  estado:String // "Nuevo" || "Pendiente" || "Solucionado"
})

const MyModel = mongoose.model("pqrs", pqrsSchema)

pqrsModel.Guardar = function(post, callback) {
  const instancia = new MyModel
  instancia.idUsuario = post.idUsuario
  instancia.email = post.email
  instancia.nombre = post.nombre
  instancia.asunto = post.asunto
  instancia.observacion = post.observacion
  instancia.estado = post.estado

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

pqrsModel.CargarTodas = function(post, callback) {
  MyModel.find({},{_id:1,idUsuario:1,nombre:1,email:1,asunto:1,observacion:1,estado:1},(error,documentos) =>{
      if (error) {
          console.log(error)
          return callback({state:false})
      }
      else {
          return callback({state:true,datos:documentos})
      }
  })
}

pqrsModel.CargarId = function(post, callback) {
  MyModel.find({_id:post.id},{idUsuario:1,nombre:1,email:1,asunto:1,observacion:1,estado:1},(error,documentos) =>{
      if (error) {
          console.log(error)
          return callback({state:false})
      }
      else {
          return callback({state:true,datos:documentos})
      }
  })
}

pqrsModel.Actualizar = function(post, callback) {
  MyModel.findByIdAndUpdate(post.id,{
    idUsuario: post.idUsuario,
    email: post.email,
    nombre: post.nombre,
    asunto: post.asunto,
    observacion: post.observacion,
    estado: post.estado
  },(error, respuesta) => {
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
