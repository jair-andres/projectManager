var newslettersModel = require("../modelos/newslettersModel.js").newslettersModel;
var newslettersController = {};

function averiguarFormatoCorreo(correo) {
  if (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(correo)) {
    return (true)
  } else {
    return (false)
  }
}

newslettersController.Guardar = function (request, response) {
  var post = {
    email: request.body.email,
    nombre: request.body.nombre,
  }
  
  var formatoDelCorreo = averiguarFormatoCorreo(post.email)
  if(formatoDelCorreo !== true){
    response.json({ state: false, mensaje: "el email esta errado" });
    return false;
  }

  if (
    post.email == undefined ||
    post.email == null ||
    post.email.trim() == ""
  ) {
    response.json({ state: false, mensaje: "el campo en obligatorio email" });
    return false;
  }
  if (
    post.nombre == undefined ||
    post.nombre == null ||
    post.nombre.trim() == ""
  ) {
    response.json({ state: false, mensaje: "el campo en obligatorio nombre" });
    return false;
  }

  newslettersModel.Guardar(post, function(resultado) {
    if (resultado.state == true) {
        response.json({
          state:true,
          mensaje:"mensaje guardado con exito"})
    }
    else {
        response.json({state:false,mensaje:"se presento un error"})
    }
})
}


newslettersController.CargarTodas = function (request, response) {
  newslettersModel.CargarTodas(null, function (respuesta) {
    if (respuesta.state == false) {
      response.json({
        state: false,
        mensaje: "se presento un error al guardar",
      });
    } else {
      response.json(respuesta);
    }
  });
};

newslettersController.EliminarNewsletters = function (request, response) {
  var post = {
    id: request.body.id,
  };
  if (post.id == undefined || post.id == null || post.id.trim() == "") {
    response.json({ state: false, mensaje: "el campo en obligatorio id" });
    return false;
  }
  newslettersModel.EliminarNewsletters(post, function (respuesta) {
    if (respuesta.state == false) {
      response.json({
        state: false,
        mensaje: "se presento un error al eliminar",
      });
    } else {
      response.json({ state: true, mensaje: "se elimino correctamente" });
    }
  });
};
module.exports.newslettersController = newslettersController;
