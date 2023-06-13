var usuariosModel = {}

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var usuariosSchema = new Schema({
  email:String,
  password:String,
  alias:String,
  nombre:String,
  apellido:String,
  telefono:String,
  rol:String,
  apellido:String,
  telefono:String,
  misProyectos:[
    {type: mongoose.Schema.Types.ObjectId, ref: 'proyectos'}
  ],
  misTareas:[
    {type: mongoose.Schema.Types.ObjectId, ref: 'tareas'}
  ]
})

const MyModel = mongoose.model("usuarios", usuariosSchema)

usuariosModel.validarEmailyNombre = function(post, callback){

    MyModel.find({$or: [ {email: post.email}, {alias: post.alias} ]},{alias:1,_id:0},(error,documento) => {
        if (error) {
            console.log(error)
            return callback({state:false})
        }
        else {
            if (documento.length == 0) {
                return callback({state:true})
            }
            else{
                return callback({state:false})
            }
        }
    })

}
usuariosModel.Guardar = function(post, callback) {
    const instancia = new MyModel
    // instancia.nombre = post.nombre
    instancia.alias = post.alias
    instancia.nombre = ""
    instancia.apellido = ""
    instancia.telefono = ""
    instancia.password = post.password
    instancia.email = post.email
    instancia.rol = "cliente"
    instancia.apellido = ""
    instancia.telefono = ""
    instancia.misProyectos = []
    instancia.misTareas = []

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
usuariosModel.CargarTodas = function(post, callback) {
    MyModel.find({},{_id:1,alias:1,nombre:1,email:1,rol:1},(error,documentos) =>{
        if (error) {
            console.log(error)
            return callback({state:false})
        }
        else {
            return callback({state:true,datos:documentos})
        }
    })
}
usuariosModel.CargarId = function(post, callback) {
    MyModel.find({_id:post.id},{_id:1,alias:1,nombre:1,apellido:1,telefono:1,email:1,rol:1,password:1,misProyectos:1,misTareas:1},(error,documentos) =>{
        if (error) {
            console.log(error)
            return callback({state:false})
        }
        else {
            return callback({state:true,datos:documentos})
        }
    })
}
usuariosModel.Buscar = function(post, callback) { 
    MyModel.find({alias: { $regex: post.foo, $options: "i" }},{_id:1,alias:1,nombre:1,email:1},(error,documentos) =>{
        if (error) {
            console.log(error)
            return callback({state:false})
        }
        else {
            return callback({state:true,datos:documentos})
        }
    })
}
usuariosModel.Actualizar =  function(post, callback) {
    MyModel.findByIdAndUpdate(post.id,{
        alias:post.alias,
        nombre:post.nombre,
        apellido:post.apellido,
        telefono:post.telefono,
        email:post.email,
        password:post.password,
        rol:post.rol,
        misProyectos:post.misProyectos,
        misTareas:post.misTareas
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
usuariosModel.Eliminar =  function(post, callback) {
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
usuariosModel.Login = function(post, callback) {
    MyModel.find({email: post.email, password: post.password},{_id:1,email:1,alias:1,nombre:1,rol:1,password:1},(error,documentos) =>{
        if (error) {
            console.log(error)
            return callback({state:false})
        }
        else {
            return callback({state:true,datos:documentos})
        }
    })
}
usuariosModel.CargarTodasMisTareas = function(post, callback) {
    MyModel.aggregate([
        { 
            $match:{
                _id:mongoose.Types.ObjectId(post.idUser)
            },
        },
        {
          $lookup:{
            from: "tareas",
            localField: "misTareas",
            foreignField: "_id",
            as: "misTareasinfo",
          }
        }
      ],(error, documentos) =>{
        if (error) {
          return callback({state:false,error:error})
        }else {
          return callback({state:true,datos:documentos})
        }
      })
}
usuariosModel.CargarTodosMisProyectos = function(post, callback) {
    MyModel.aggregate([
        { 
            $match:{
                _id:mongoose.Types.ObjectId(post.idUser)
            },
        },
        {
          $lookup:{
            from: "proyectos",
            localField: "misProyectos",
            foreignField: "_id",
            as: "misProyectosinfo",
          }
        }
      ],(error, documentos) =>{
        if (error) {
          return callback({state:false,error:error})
        }else {
          return callback({state:true,datos:documentos})
        }
      })
}

module.exports.usuariosModel = usuariosModel
