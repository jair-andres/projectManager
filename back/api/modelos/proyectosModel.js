var proyectosModel = {}

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var proyectosSchema = new Schema({
  nombreProyecto:String,
  descripcion:String,
  objetivo:String,
  fechaEntrega:String,
  prosupuesto:Number
})

const MyModel = mongoose.model("proyectos", proyectosSchema)

proyectosModel.Guardar = function(post, callback) {
    const instancia = new MyModel
    instancia.nombreProyecto = post.nombreProyecto
    instancia.descripcion = post.descripcion
    instancia.objetivo = post.objetivo,
    instancia.fechaEntrega = post.fechaEntrega,
    instancia.prosupuesto = post.prosupuesto

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

proyectosModel.CargarTodas = function(post, callback) {
    MyModel.find({},{_id:1,nombreProyecto:1, descripcion:1, objetivo:1, fechaEntrega:1, prosupuesto:1},(error,documentos) =>{
        if (error) {
            console.log(error)
            return callback({state:false})
        }
        else {
            return callback({state:true,datos:documentos})
        }
    })
}

proyectosModel.CargarId = function(post, callback) {
  MyModel.aggregate([
    {
      $match:{},
      $lookup:{
        from:"tareas",
        localField:"keyProyecto",
        foreignField:"_id",
        as:"tareas",
        pipeline:[]
      }
    }
  ])
  /*MyModel.find({_id:post.id},{nombreProyecto:1, descripcion:1, objetivo:1, fechaEntrega:1, prosupuesto:1},(error,documentos) =>{
      if (error) {
          console.log(error)
          return callback({state:false})
      }
      else {
          return callback({state:true,datos:documentos})
      }
  })*/
}

proyectosModel.Actualizar =  function(post, callback) {
    MyModel.findByIdAndUpdate(post.id,{
        nombreProyecto:post.nombreProyecto,
        descripcion:post.descripcion,
        objetivo:post.objetivo,
        fechaEntrega:post.fechaEntrega,
        prosupuesto:post.prosupuesto
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

proyectosModel.Eliminar =  function(post, callback) {
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

module.exports.proyectosModel = proyectosModel

