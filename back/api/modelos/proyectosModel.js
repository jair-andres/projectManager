var proyectosModel = {}

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var proyectosSchema = new Schema({
  nombreProyecto:String,
  descripcion:String,
  objetivo:String,
  fechaEntrega:Date,
  prosupesto:Number
})

const MyModel = mongoose.model("proyectos", proyectosSchema)

proyectosModel.Guardar = function(post, callback) {
    const instancia = new MyModel
    instancia.nombreProyecto = post.nombreProyecto
    instancia.descripcion = post.descripcion
    instancia.objetivo = post.objetivo,
    instancia.fechaEntrega = post.fechaEntrega,
    instancia.prosupesto = post.prosupesto

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
    MyModel.find({},{_id:1,nombreProyecto:1, descripcion:1, objetivo:1, fechaEntrega:1, prosupesto:1},(error,documentos) =>{
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
    MyModel.find({_id:post.id},{nombreProyecto:1, descripcion:1, objetivo:1, fechaEntrega:1, prosupesto:1},(error,documentos) =>{
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
        prosupesto:post.prosupesto
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
