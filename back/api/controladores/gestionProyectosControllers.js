/* var gestionProyectoModel = require("../modelos/gestionProyectoModel.js").gestionProyectoModel;
var gestionProyectoController = {};

gestionProyectoController.Guardar = function (request, response) {
  var post = {
    nombre: request.body.nombre,
    email: request.body.email,
    password: request.body.password,
  };

  if (
    post.nombre == undefined ||
    post.nombre == null ||
    post.nombre.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }
  if (
    post.email == undefined ||
    post.email == null ||
    post.email.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo email es obligatorio" });
    return false;
  }else if(formatoDelCorreo !== true){
    response.json({ state: false, mensaje: "Formato del correo inválido" });
    return false;
  }
  if (
    post.password == undefined ||
    post.password == null ||
    post.password.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo password es obligatorio" });
    return false;
  }

  gestionProyectoModel.validarEmailyNombre(post, function (existe) {
    if (existe.state == false) {
      response.json({
        state: false,
        mensaje:
          "El registro no se pudo almacenar, el email o usuario ya esta en uso",
      });
    } else {
      //almacenamiento
      gestionProyectoModel.Guardar(post, function (resultado) {
        if (resultado.state == true) {
          response.json({
            state: true,
            mensaje: "registro guardado con exito",
          });
        } else {
          response.json({ state: false, mensaje: "se presento un error" });
        }
      });
    }
  });
};

gestionProyectoController.CargarTodas = function (request, response) {
  gestionProyectoModel.CargarTodas(null, function (respuesta) {
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

gestionProyectoController.CargarId = function (request, response) {
  var post = {
    id: request.body.id,
  };
  if (post.id == undefined || post.id == null || post.id.trim() == "") {
    response.json({ state: false, mensaje: "el campo id es obligatorio" });
    return false;
  }

  gestionProyectoModel.CargarId(post, function (respuesta) {
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

gestionProyectoController.Actualizar = function (request, response) {
  var post = {
    nombre: request.body.nombre,
    email: request.body.email,
    password: request.body.password,
    id: request.body.id,
    rol: request.body.rol,
  };
  var formatoDelCorreo = averiguarFormatoCorreo(post.email)

  if (
    post.nombre == undefined ||
    post.nombre == null ||
    post.nombre.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }
  if (
    post.email == undefined ||
    post.email == null ||
    post.email.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo email es obligatorio" });
    return false;
  }else if(formatoDelCorreo !== true){
    response.json({ state: false, mensaje: "Formato del correo inválido" });
    return false;
  }
  if (
    post.password == undefined ||
    post.password == null ||
    post.password.trim() == ""
  ) {
    response.json({
      state: false,
      mensaje: "El campo password es obligatorio",
    });
    return false;
  }
  if (post.id == undefined || post.id == null || post.id.trim() == "") {
    response.json({ state: false, mensaje: "el campo en obligatorio id" });
    return false;
  }
  gestionProyectoModel.Actualizar(post, function (respuesta) {
    if (respuesta.state == false) {
      response.json({
        state: false,
        mensaje: "se presento un error al actualizar",
      });
    } else {
      response.json({ state: true, mensaje: "se actualizo correctamente" });
    }
  });
};

gestionProyectoController.Eliminar = function (request, response) {
  var post = {
    id: request.body.id,
  };
  if (post.id == undefined || post.id == null || post.id.trim() == "") {
    response.json({ state: false, mensaje: "el campo en obligatorio id" });
    return false;
  }
  gestionProyectoModel.Eliminar(post, function (respuesta) {
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

module.exports.gestionProyectoController = gestionProyectoController;
 */