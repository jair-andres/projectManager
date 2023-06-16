var pqrsModel = require("../modelos/pqrsModel.js").pqrsModel;
var pqrsController = {};

function averiguarFormatoCorreo(correo) {
  if (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(correo)) {
    return (true)
  } else {
    return (false)
  }
}

pqrsController.Guardar = function (request, response) {
  var post = {
    idUsuario: request.body.idUsuario,
    email: request.body.email,
    nombre: request.body.nombre,
    asunto: request.body.asunto,
    observacion: request.body.observacion,
    estado: "Nuevo"
  };

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
  if (
    post.asunto == undefined ||
    post.asunto == null ||
    post.asunto.trim() == ""
  ) {
    response.json({ state: false, mensaje: "el campo en obligatorio asunto" });
    return false;
  }
  if (
    post.observacion == undefined ||
    post.observacion == null ||
    post.observacion.trim() == ""
  ) {
    response.json({ state: false, mensaje: "el campo en obligatorio observacion" });
    return false;
  }

  pqrsModel.Guardar(post, function(resultado) {
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

pqrsController.CargarTodas = function (request, response) {
  pqrsModel.CargarTodas(null, function (respuesta) {
    if (respuesta.state == false) {
      response.json({
        state: false,
        mensaje: "se presento un error al guardar",
      })
    } else {
      response.json(respuesta);
    }
  })
}

pqrsController.CargarId = function (request, response) {
  var post = {
    id: request.body.id,
  };
  if (post.id == undefined || post.id == null || post.id.trim() == "") {
    response.json({ state: false, mensaje: "el id es obligatorio" });
    return false;
  }
  pqrsModel.CargarId(post, function (respuesta) {
    if (respuesta.state == false) {
      response.json({
        state: false,
        mensaje: "se presento un error al guardar",
      })
    } else {
      response.json(respuesta);
    }
  })
}

pqrsController.Actualizar = function(request, response) {
  var post = {
    id: request.body.id,
    idUsuario: request.body.idUsuario,
    email: request.body.email,
    nombre: request.body.nombre,
    asunto: request.body.asunto,
    observacion: request.body.observacion,
    estado: request.body.estado,
  };

  var formatoDelCorreo = averiguarFormatoCorreo(post.email)
  if(formatoDelCorreo !== true){
    response.json({ state: false, mensaje: "el email esta errado" });
    return false;
  }

  if (
    post.id == undefined ||
    post.id == null ||
    post.id.trim() == ""
  ) {
    response.json({ state: false, mensaje: "el id de mensaje es obligatorio" });
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
  if (
    post.asunto == undefined ||
    post.asunto == null ||
    post.asunto.trim() == ""
  ) {
    response.json({ state: false, mensaje: "el campo en obligatorio asunto" });
    return false;
  }
  if (
    post.observacion == undefined ||
    post.observacion == null ||
    post.observacion.trim() == ""
  ) {
    response.json({ state: false, mensaje: "el campo en obligatorio observacion" });
    return false;
  }
  pqrsModel.Actualizar(post, function (respuesta) {
    if (respuesta.state == false) {
    response.json({
        state: false,
        mensaje: "se presento un error al actualizar",
    });
    } else {
    response.json({ state: true, mensaje: "se actualizo correctamente" });
    }
});
}
module.exports.pqrsController = pqrsController;
