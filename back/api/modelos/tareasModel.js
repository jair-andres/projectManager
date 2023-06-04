var tareasModel = {}

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var tareasSchema = new Schema({
  titulo: String,
  miembros: String,
  descripcion: String,
  fecha: String,
  fechaFinal: String,
  estado:String,
  actividades: String,
  comentarios: String
})

const MyModel = mongoose.model("tareas", tareasSchema)

tareasModel.Guardar = function(post, callback) {

  const instancia = new MyModel
  instancia.titulo = post.titulo
  instancia.miembros = post.miembros
  instancia.descripcion = post.descripcion
  instancia.fecha = post.fecha
  instancia.fechaFinal = post.fechaFinal
  instancia.estado = post.estado
  instancia.actividades = post.actividades
  instancia.comentarios = post.comentarios

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

tareasModel.CargarTodas = function(post, callback) {
  MyModel.find({},{},(error,documentos) =>{
      if (error) {
          console.log(error)
          return callback({state:false})
      }
      else {
          return callback({state:true,datos:documentos})
      }
  })
}

tareasModel.CargarId = function(post, callback) {
  MyModel.find({},(error,documentos) =>{
      if (error) {
          console.log(error)
          return callback({state:false})
      }
      else {
          return callback({state:true,datos:documentos})
      }
  })
}

tareasModel.Actualizar =  function(post, callback) {
  MyModel.findByIdAndUpdate(post.id,{
    titulo: post.titulo,
    miembros: post.miembros,
    descripcion: post.descripcion,
    fecha: post.fecha,
    fechaFinal :post.fechaFinal,
    estado: post.estado,
    actividades: post.actividades,
    comentarios: post.comentarios
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

tareasModel.Eliminar =  function(post, callback) {
  MyModel.findByIdAndDelete(post.id,(error,respuesta) =>{
      if (error) {
          console.log(error)
          return callback({state:false})
      }
      else {
          return callback({state:true})
      }
  })
}

module.exports.tareasModel = tareasModel
