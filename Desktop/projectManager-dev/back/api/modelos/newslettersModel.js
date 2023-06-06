var newslettersModel = {}

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var newslettersSchema = new Schema({
  email:String,
  nombre:String,
})

const MyModel = mongoose.model("newsletters", newslettersSchema)

newslettersModel.Guardar = function(post, callback) {
    const instancia = new MyModel
    instancia.email = post.email
    instancia.nombre = post.nombre

    instancia.save((error, creado) => {
        if (error) {
            console.log(error)
            return callback({state:false})
        } else {
            return callback({state:true})
        }
    })
}

newslettersModel.CargarTodas = function(post, callback) {
    MyModel.find({},{nombre:1,email:1,},(error,documentos) =>{
        if (error) {
            console.log(error)
            return callback({state:false})
        } else {
            return callback({state:true,datos:documentos})
        }
    })
}
module.exports.newslettersModel = newslettersModel
