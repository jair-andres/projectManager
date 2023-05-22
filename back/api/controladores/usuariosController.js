
var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel
var usuariosController = {}

usuariosController.Guardar = function(request, response) {
    var post = {
        nombre: request.body.nombre,
        email: request.body.email,
        password: request.body.password
    }
    /*console.log(request.body.nombre);
    response.json({state:true, mensaje:"funciono"})*/
    if(post.nombre == undefined || post.nombre == null || post.nombre.trim() == ""){
        response.json({stat:false, mensaje:"el campo en obligatorio nombre"})
        return false
    }
    if(post.email == undefined || post.email == null || post.email.trim() == ""){
        response.json({stat:false, mensaje:"el campo en obligatorio email"})
        return false
    }
    if(post.password == undefined || post.password == null || post.password.trim() == ""){
        response.json({stat:false, mensaje:"el campo en obligatorio password"})
        return false
    }

    usuariosModel.validarEmail(post,function(existe) {
        if (existe.sate == false) {
            response.json({state:false, mensaje:"El registro no se pudo almacenar, intente con otro"})
        }
        else {
            //almacenamiento
            usuariosModel.Guardar(post, function(resultado) {
                if (resultado.state == true) {
                    response.json({state:true,mensaje:"registro guardado con exito"})
                }
                else {
                    response.json({state:false,mensaje:"se presento un error"})
                }
            })
        }
    })
}

usuariosController.CargarTodas = function(request, response) {
    usuariosModel.CargarTodas(null, function(respuesta) {
        if (respuesta.state == false) {
            response.json({state:true,mensaje:"se presento un error al guardar"})
        }else {
            response.json(respuesta)
        }
    })
}

usuariosController.Actualizar = function(request, response) {
    var post = {
        nombre:request.body.nombre,
        email:request.body.email,
        password:request.body.password,
        id:request.body.id,
        rol:request.body.rol
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre.trim() == ""){
        response.json({stat:false, mensaje:"el campo en obligatorio nombre"})
        return false
    }
    if(post.email == undefined || post.email == null || post.email.trim() == ""){
        response.json({stat:false, mensaje:"el campo en obligatorio email"})
        return false
    }
    if(post.password == undefined || post.password == null || post.password.trim() == ""){
        response.json({stat:false, mensaje:"el campo en obligatorio password"})
        return false
    }
    if(post.id == undefined || post.id == null || post.id.trim() == ""){
        response.json({stat:false, mensaje:"el campo en obligatorio id"})
        return false
    }
    usuariosModel.Actualizar(post, function(respuesta) {
        if (respuesta.sate == false) {
            response.json({stat:false, mensaje:"se presento un error al actualizar"})
        }
        else {
            response.json({stat:false, mensaje:"se actualizo correctamente"})
        }
    })
}

usuariosController.Eliminar = function(request, response) {
    var post = {
        id:request.body.id
    }
    if(post.id == undefined || post.id == null || post.id.trim() == ""){
        response.json({stat:false, mensaje:"el campo en obligatorio id"})
        return false
    }
    usuariosModel.Eliminar(post,function(respuesta) {
        if (respuesta.sate == false) {
            response.json({stat:false, mensaje:"se presento un error al eliminar"})
        }
        else {
            response.json({stat:false, mensaje:"se elimino correctamente"})
        }
    })
}

usuariosController.Login = function(request, response) {

    var users = [
        { email: "john@gmail.com", password: "123456789" },
        { email: "pedro@gmail.com", password: "123456" }
    ]

    var post = {
        email: request.body.email,
        password: request.body.password
    }

    if (post.email == undefined || post.email.trim() == "" || post.email == null) {
        response.json({ state: false, mensaje: "el campo email es obligatorio" })
        return false
    }

    if (post.password == undefined || post.password.trim() == "" || post.password == null) {
        response.json({ state: false, mensaje: "el campo password es obligatorio" })
        return false
    }


    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(post.email) == false) {
        response.json({ state: false, mensaje: "el campo email no coincide con email valido" })
        return false
    }


    var position = users.findIndex((item) => item.email.toUpperCase() == post.email.toUpperCase() && item.password.toUpperCase() == post.password.toUpperCase())
    console.log(position)

    if (position == -1) {
        response.json({ state: false, mensaje: "Usuario o Password Invalido" })
    } else {
        response.json({ state: true, mensaje: "Datos Correctos..." })
    }
}

module.exports.usuariosController = usuariosController
