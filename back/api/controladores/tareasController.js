var tareasModel = require("../modelos/tareasModel.js").tareasModel;
var tareasController = {};

tareasController.Consultar = function (request, response) {
  tareasModel.Consultar(null, function (respuesta) {
    if (respuesta.state == false) {
      response.json({
        state: false,
        mensaje: "se presento un error al guardar",
      });
    } else {
      response.json(respuesta);
    }
  });
}

tareasController.Guardar = function (request, response) {
  var post = {
    titulo: request.body.titulo,
    keyProyecto: request.body.keyProyecto,
    miembros: request.body.miembros,
    descripcion: request.body.descripcion,
    fecha: request.body.fecha,
    fechaFinal: request.body.fechaFinal,
    estado: request.body.estado,
    actividades: request.body.actividades,
    comentarios: request.body.comentarios
  }

  if (
    post.titulo == undefined ||
    post.titulo == null ||
    post.titulo.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }

  if (
    post.keyProyecto == undefined ||
    post.keyProyecto == null ||
    post.keyProyecto.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El keyProyecto es obligatorio" });
    return false;
  }

  if (
    post.miembros == undefined ||
    post.miembros == null ||
    post.miembros.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }

  if (
    post.descripcion == undefined ||
    post.descripcion == null ||
    post.descripcion.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }

  if (
    post.fecha == undefined ||
    post.fecha == null ||
    post.fecha.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }

  if (
    post.fechaFinal == undefined ||
    post.fechaFinal == null ||
    post.fechaFinal.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }

  if (
    post.estado == undefined ||
    post.estado == null ||
    post.estado.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }

  if (
    post.actividades == undefined ||
    post.actividades == null ||
    post.actividades.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }

  if (
    post.comentarios == undefined ||
    post.comentarios == null ||
    post.comentarios.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }

  tareasModel.Guardar(post, function (resultado) {
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

tareasController.Actualizar = function (request, response) {
  var post = {
    id: request.body.id,
    titulo: request.body.titulo,
    miembros: request.body.miembros,
    descripcion: request.body.descripcion,
    fecha: request.body.fecha,
    fechaFinal: request.body.fechaFinal,
    estado: request.body.estado,
    actividades: request.body.actividades,
    comentarios: request.body.comentarios
  };

  if (
    post.id == undefined ||
    post.id == null ||
    post.id.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }

  if (
    post.titulo == undefined ||
    post.titulo == null ||
    post.titulo.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }

  if (
    post.miembros == undefined ||
    post.miembros == null ||
    post.miembros.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }

  if (
    post.descripcion == undefined ||
    post.descripcion == null ||
    post.descripcion.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }

  if (
    post.fecha == undefined ||
    post.fecha == null ||
    post.fecha.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }

  if (
    post.fechaFinal == undefined ||
    post.fechaFinal == null ||
    post.fechaFinal.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }

  if (
    post.estado == undefined ||
    post.estado == null ||
    post.estado.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }

  if (
    post.actividades == undefined ||
    post.actividades == null ||
    post.actividades.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }

  if (
    post.comentarios == undefined ||
    post.comentarios == null ||
    post.comentarios.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }

}

tareasController.Eliminar = function (request, response) {
  var post = {
    id: request.body.id
  };

  if (post.id == undefined || post.id == null || post.id.trim() == "") {
    response.json({ state: false, mensaje: "el campo en obligatorio id" });
    return false;
  }

  tareasModel.Eliminar(post, function (respuesta) {
    if (respuesta.state == false) {
      response.json({
        state: false,
        mensaje: "se presento un error al eliminar",
      });
    } else {
      response.json({ state: true, mensaje: "se elimino correctamente" });
    }
  });
}

module.exports.tareasController = tareasController;

