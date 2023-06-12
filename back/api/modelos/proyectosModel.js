var proyectosModel = {}

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var proyectosSchema = new Schema({
  nombreProyecto:String,
  descripcion:String,
  objetivo:String,
  fechaEntrega:String,
  prosupuesto:Number,
  miembros:[
    {type: mongoose.Schema.Types.ObjectId, ref: 'usuarios'}
  ],
  tareas:[
    {type: mongoose.Schema.Types.ObjectId, ref: 'tareas'}
  ],
  keyUser:mongoose.Schema.Types.ObjectId
})

const MyModel = mongoose.model("proyectos", proyectosSchema)

proyectosModel.Guardar = function(post, callback) {
    const instancia = new MyModel
    instancia.nombreProyecto = post.nombreProyecto
    instancia.descripcion = post.descripcion
    instancia.objetivo = post.objetivo,
    instancia.fechaEntrega = post.fechaEntrega,
    instancia.prosupuesto = post.prosupuesto,
    instancia.miembros = post.miembros,
    instancia.tareas = post.tareas,
    instancia.keyUser = post.keyUser

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
  MyModel.find({_id:post.id},{nombreProyecto:1, descripcion:1, objetivo:1, fechaEntrega:1, prosupuesto:1, miembros:1, tareas:1, keyUser:1},(error,documentos) =>{
      if (error) {
          console.log(error)
          return callback({state:false})
      }
      else {
          return callback({state:true,datos:documentos})
      }
  })
}

proyectosModel.Actualizar =  function(post, callback) {
    MyModel.findByIdAndUpdate(post.id,{
        nombreProyecto:post.nombreProyecto,
        descripcion:post.descripcion,
        objetivo:post.objetivo,
        fechaEntrega:post.fechaEntrega,
        prosupuesto:post.prosupuesto,
        miembros: post.miembros,
        tareas: post.tareas,
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

proyectosModel.CargarTareas = function(post, callback) {
  MyModel.aggregate([
    {
      $match:{
        _id:mongoose.Types.ObjectId(post.idProyect)
      },
      $lookup:{
        from: "tareas",
        localField: "_id",
        foreignField: "keyProyect",
        as: "tareas"
      }
    }
  ],(error, documentos) =>{
    if (error) {
      return callback({state:false,error:error})
    }else {
      return callback({state:true,date:documentos})
    }
  })
}

proyectosModel.detalleProyecto = function(post, callback) {
  MyModel.aggregate([
    {
      $match:{
        _id:mongoose.Types.ObjectId(post.idProyect)
      }
    },
    {
      $lookup:{
        from: "usuarios",
        localField: "miembros",
        foreignField: "_id",
        as: "miembrosInfo",
      }
    },
    {
      $lookup:{
        from: "usuarios",
        localField: "keyUser",
        foreignField: "_id",
        as: "lider",
      }
    },
    {
      $unwind:"$lider"
    },
    {
      $lookup:{
        from: "tareas",
        localField: "_id",
        foreignField: "keyProyect",
        as: "tareasInfo",
      }
    },
    {
      $project: {
        miembros:0, keyUser:0,
      },
    }
  ],(error, documentos) =>{
    if (error) {
      return callback({state:false,error:error})
    }else {
      return callback({state:true,datos:documentos})
    }
  })
}

module.exports.proyectosModel = proyectosModel

