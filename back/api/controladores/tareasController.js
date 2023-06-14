var tareasModel = require("../modelos/tareasModel.js").tareasModel;
var tareasController = {};

// tareasController.Consultar = function (request, response) {
//   tareasModel.Consultar(null, function (respuesta) {
//     if (respuesta.state == false) {
//       response.json({
//         state: false,
//         mensaje: "se presento un error al guardar",
//       });
//     } else {
//       response.json(respuesta);
//     }
//   });
// }

tareasController.Guardar = function (request, response) {
  var post = {
    titulo: request.body.titulo,
    descripcion: request.body.descripcion,
    fechaInicio: request.body.fechaInicio,
    fechaFinal: request.body.fechaFinal,
    // estado: request.body.estado,
    estado: "Nuevo",
    actividades: request.body.actividades,
    comentarios: [],
    keyProyecto: request.body.keyProyecto,
    keyEncargado:request.body.keyEncargado,
    miembros: request.body.miembros,
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
    post.miembros == []
  ) {
    response.json({ state: false, mensaje: "El campo miembros es obligatorio" });
    return false;
  }

  if (
    post.descripcion == undefined ||
    post.descripcion == null ||
    post.descripcion.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo descripcion es obligatorio" });
    return false;
  }

  if (
    post.fechaInicio == undefined ||
    post.fechaInicio == null ||
    post.fechaInicio.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo fecha de inicio es obligatorio" });
    return false;
  }

  if (
    post.fechaFinal == undefined ||
    post.fechaFinal == null ||
    post.fechaFinal.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo fecha final es obligatorio" });
    return false;
  }

  if (
    post.estado == undefined ||
    post.estado == null ||
    post.estado.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo estado es obligatorio" });
    return false;
  }

  if (
    post.actividades == undefined ||
    post.actividades == null //||
    // post.actividades == []
  ) {
    response.json({ state: false, mensaje: "El campo actividades es obligatorio" });
    return false;
  }

  if (
    post.comentarios == undefined ||
    post.comentarios == null //||
    // post.comentarios == []
  ) {
    response.json({ state: false, mensaje: "El campo comentarios es obligatorio" });
    return false;
  }

  tareasModel.Guardar(post, function (resultado) {
    if (resultado.state == true) {
      response.json({
        state: true,
        mensaje: "tarea registrada con exito",
        id: resultado.id
      });
    } else {
      response.json({ state: false, mensaje: "se presento un error" });
    }
  });

}

tareasController.CargarTodas = function(request, response){
  tareasModel.CargarTodas(null, function (respuesta) {
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

tareasController.CargarId = function(request, response){
  var post = {
    id: request.body.id,
  };
  if (post.id == undefined || post.id == null || post.id.trim() == "") {
      response.json({ state: false, mensaje: "el campo id es obligatorio" });
      return false;
  }

  tareasModel.CargarId(post, function (respuesta) {
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

tareasController.Actualizar = function (request, response) {
  var post = {
    id: request.body.id,
    titulo: request.body.titulo,
    descripcion: request.body.descripcion,
    fechaInicio: request.body.fechaInicio,
    fechaFinal: request.body.fechaFinal,
    actividades: request.body.actividades,
    keyEncargado:request.body.keyEncargado,
    miembros: request.body.miembros,
    estado: request.body.estado,
    comentarios: request.body.comentarios
  };

  if (
    post.id == undefined ||
    post.id == null ||
    post.id.trim() == ""
  ) {
    response.json({ state: false, mensaje: "El campo id es obligatorio" });
    return false;
  }

  if(post.keyEncargado){
    if (
      post.keyEncargado == undefined ||
      post.keyEncargado == null ||
      post.keyEncargado.trim() == ""
    ) {
      response.json({ state: false, mensaje: "El campo keyEncargado es obligatorio" });
      return false;
    }
  }

  if(post.titulo){
    if (
      post.titulo == undefined ||
      post.titulo == null ||
      post.titulo.trim() == ""
    ) {
      response.json({ state: false, mensaje: "El campo titulo es obligatorio" });
      return false;
    }
  }
  
  if(post.descripcion){
    if (
      post.descripcion == undefined ||
      post.descripcion == null ||
      post.descripcion.trim() == ""
    ) {
      response.json({ state: false, mensaje: "El campo descripcion es obligatorio" });
      return false;
    }
  }
  
  if(post.fechaInicio){
    if (
      post.fechaInicio == undefined ||
      post.fechaInicio == null ||
      post.fechaInicio.trim() == ""
    ) {
      response.json({ state: false, mensaje: "El campo fecha de inicio es obligatorio" });
      return false;
    }
  }
  
  if(post.fechaFinal){
    if (
      post.fechaFinal == undefined ||
      post.fechaFinal == null ||
      post.fechaFinal.trim() == ""
    ) {
      response.json({ state: false, mensaje: "El campo fecha final es obligatorio" });
      return false;
    }
  }
  
  if(post.estado){
    if (
      post.estado == undefined ||
      post.estado == null ||
      post.estado.trim() == ""
    ) {
      response.json({ state: false, mensaje: "El campo estado es obligatorio" });
      return false;
    }
  }
  
  if(post.actividades){
    if (
      post.actividades == undefined ||
      post.actividades == null //||
      //post.actividades == []
    ) {
      response.json({ state: false, mensaje: "El campo actividades es obligatorio" });
      return false;
    }
  }

  if(post.miembros){
    if (
      post.miembros == undefined ||
      post.miembros == null //||
      //post.actividades == []
    ) {
      response.json({ state: false, mensaje: "El campo miembros es obligatorio" });
      return false;
    }
  }
  
  if(post.comentarios){
    if (
      post.comentarios == undefined ||
      post.comentarios == null //||
      // post.comentarios == []
    ) {
      response.json({ state: false, mensaje: "El campo comentarios es obligatorio" });
      return false;
    }
  }
  tareasModel.Actualizar(post, function (respuesta) {
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

