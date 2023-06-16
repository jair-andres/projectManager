var tareasModel = {}

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var tareasSchema = new Schema({
  titulo: String,
  descripcion: String,
  fechaInicio: String,
  fechaFinal: String,
  estado:String,
  actividades: Array,
  comentarios: Array,
  keyProyecto: {type: mongoose.Schema.Types.ObjectId, ref: 'proyectos'},
  keyEncargado:{type: mongoose.Schema.Types.ObjectId, ref: 'usuarios'},
  miembros: Array
})

const MyModel = mongoose.model("tareas", tareasSchema)

tareasModel.Guardar = function(post, callback) {
  const instancia = new MyModel
  instancia.titulo = post.titulo
  instancia.descripcion = post.descripcion
  instancia.fechaInicio = post.fechaInicio
  instancia.fechaFinal = post.fechaFinal
  instancia.estado = "Nuevo"
  instancia.comentarios = []
  instancia.actividades = post.actividades
  instancia.keyProyecto = post.keyProyecto
  instancia.keyEncargado = post.keyEncargado
  instancia.miembros = post.miembros

  instancia.save((error, creado) => {
      if (error) {
          console.log(error)
          return callback({state:false})
      }
      else {
          return callback({state:true, id:instancia.id})
      }
  })
}

tareasModel.CargarTodas = function(post, callback) {
  MyModel.find({},{_id:1,titulo:1, fechaInicio:1, estado:1, keyEncargado:1, keyProyecto:1},(error,documentos) =>{
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
  MyModel.find({_id:post.id},{titulo:1, fechaInicio:1, estado:1, keyEncargado:1, keyProyecto:1,descripcion:1,fechaFinal:1,actividades:1,comentarios:1},(error,documentos) =>{
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
    descripcion: post.descripcion,
    fechaInicio: post.fechaInicio,
    fechaFinal :post.fechaFinal,
    estado: post.estado,
    actividades: post.actividades,
    comentarios: post.comentarios,
    keyProyecto: post.keyProyecto,
    keyEncargado: post.keyEncargado,
    miembros: post.miembros,
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
