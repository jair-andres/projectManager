var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel;
var usuariosController = {};

usuariosController.Guardar = function (request, response) {
  var post = {
    nombre: request.body.nombre,
    email: request.body.email,
    password: request.body.password,
  };
  /*console.log(request.body.nombre);
    response.json({state:true, mensaje:"funciono"})*/
  if (
    post.nombre == undefined ||
    post.nombre == null ||
    post.nombre.trim() == ""
  ) {
    response.json({ state: false, mensaje: "el campo en obligatorio nombre" });
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
    post.password == undefined ||
    post.password == null ||
    post.password.trim() == ""
  ) {
    response.json({
      state: false,
      mensaje: "el campo en obligatorio password",
    });
    return false;
  }

  usuariosModel.validarEmail(post, function (existe) {
    if (existe.state == false) {
      response.json({
        state: false,
        mensaje: "El registro no se pudo almacenar, intente con otro",
      });
    } else {
      //almacenamiento
      usuariosModel.Guardar(post, function (resultado) {
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

usuariosController.CargarTodas = function (request, response) {
  usuariosModel.CargarTodas(null, function (respuesta) {
    if (respuesta.state == false) {
      response.json({
        state: true,
        mensaje: "se presento un error al guardar",
      });
    } else {
      response.json(respuesta);
    }
  });
};

usuariosController.Actualizar = function (request, response) {
  var post = {
    nombre: request.body.nombre,
    email: request.body.email,
    password: request.body.password,
    id: request.body.id,
    rol: request.body.rol,
  };

  if (
    post.nombre == undefined ||
    post.nombre == null ||
    post.nombre.trim() == ""
  ) {
    response.json({ state: false, mensaje: "el campo en obligatorio nombre" });
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
    post.password == undefined ||
    post.password == null ||
    post.password.trim() == ""
  ) {
    response.json({
      state: false,
      mensaje: "el campo en obligatorio password",
    });
    return false;
  }
  if (post.id == undefined || post.id == null || post.id.trim() == "") {
    response.json({ state: false, mensaje: "el campo en obligatorio id" });
    return false;
  }
  usuariosModel.Actualizar(post, function (respuesta) {
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

usuariosController.Eliminar = function (request, response) {
  var post = {
    id: request.body.id,
  };
  if (post.id == undefined || post.id == null || post.id.trim() == "") {
    response.json({ state: false, mensaje: "el campo en obligatorio id" });
    return false;
  }
  usuariosModel.Eliminar(post, function (respuesta) {
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

usuariosController.Login = function (request, response) {
  var post = {
    email: request.body.email,
    password: request.body.password,
  };

  if (
    post.email == undefined ||
    post.email == null ||
    post.email.trim() == ""
  ) {
    response.json({ state: false, mensaje: "el campo en obligatorio email" });
    return false;
  }

  if (
    post.password == undefined ||
    post.password == null ||
    post.password.trim() == ""
  ) {
    response.json({
      state: false,
      mensaje: "el campo en obligatorio password",
    });
    return false;
  }

  usuariosModel.Login(post, function (respuesta) {
    if (respuesta.state == false) {
      response.json({
        state: true,
        mensaje: "se presento un error al guardar",
      });
    } else {
      response.json(respuesta);
    }
  });
};

module.exports.usuariosController = usuariosController;
