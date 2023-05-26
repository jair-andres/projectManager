var usuariosModel = {}

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var usuariosSchema = new Schema({
    email:String,
    password:String,
    nombre:String,
    rol:String
})

const MyModel = mongoose.model("usuarios", usuariosSchema)

usuariosModel.validarEmailyNombre = function(post, callback){

    MyModel.find({$or: [ {email: post.email}, {nombre: post.nombre} ]},{nombre:1,_id:0},(error,documento) => {
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
    instancia.nombre = post.nombre
    instancia.password = post.password
    instancia.email = post.email
    instancia.rol = "Cliente"

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
    MyModel.find({},{nombre:1,_id:1,email:1,rol:1},(error,documentos) =>{
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
        email:post.email,
        nombre:post.nombre,
        password:post.password,
        rol:post.rol
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
    MyModel.find({email: post.email, password: post.password},{_id:1,email:1,nombre:1,rol:1},(error,documentos) =>{
        if (error) {
            console.log(error)
            return callback({state:false})
        }
        else {
            return callback({state:true,datos:documentos})
        }
    })
}

module.exports.usuariosModel = usuariosModel
