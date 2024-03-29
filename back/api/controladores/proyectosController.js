var proyectosModel = require("../modelos/proyectosModel.js").proyectosModel;
var proyectosController = {};

proyectosController.Guardar = function (request, response) {
    var post = {
      nombreProyecto: request.body.nombreProyecto,
      descripcion: request.body.descripcion,
      objetivo: request.body.objetivo,
      fechaEntrega: request.body.fechaEntrega,
      prosupuesto:request.body.prosupuesto,
      miembros:request.body.miembros,
      tareas:request.body.tareas,
      keyUser:request.body.keyUser
    };

    if (
      post.nombreProyecto == undefined ||
      post.nombreProyecto == null ||
      post.nombreProyecto.trim() == ""
    ) {
      response.json({ state: false, mensaje: "el campo nombre del proyecto es obligatorio" });
      return false;
    }
    if (
      post.descripcion == undefined ||
      post.descripcion == null ||
      post.descripcion.trim() == ""
    ) {
      response.json({ state: false, mensaje: "el campo descripcion es obligatorio" });
      return false;
    }
    if (
      post.objetivo == undefined ||
      post.objetivo == null ||
      post.objetivo.trim() == ""
    ) {
      response.json({ state: false, mensaje: "el campo objetivo es obligatorio" });
      return false;
    }
    if (
      post.fechaEntrega == undefined ||
      post.fechaEntrega == null ||
      post.fechaEntrega.trim() == ""
    ) {
      response.json({ state: false, mensaje: "el campo fecha de entrega es obligatorio" });
      return false;
    }
    if (
      post.prosupuesto == undefined ||
      post.prosupuesto == null
      // post.prosupuesto.trim() == ""
    ) {
      response.json({ state: false, mensaje: "el campo prosupuesto es obligatorio" });
      return false;
    }
    if (
      post.tareas == undefined ||
      post.tareas == null
      // post.tareas.trim() == ""
    ) {
      response.json({ state: false, mensaje: "el campo prosupuesto es obligatorio" });
      return false;
    }
    if (
      post.miembros == undefined ||
      post.miembros == null ||
      post.miembros == []
    ) {
      response.json({ state: false, mensaje: "el campo miembros es obligatorio" });
      return false;
    }

    proyectosModel.Guardar(post, function (resultado) {
        if (resultado.state == true) {
        response.json({
            state: true,
            mensaje: "proyecto guardado con exito",
            id: resultado.id
        });
        } else {
        response.json({ state: false, mensaje: "se presento un error" });
        }
    });

};

proyectosController.CargarTodas = function (request, response) {
    proyectosModel.CargarTodas(null, function (respuesta) {
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

proyectosController.CargarId = function (request, response) {
    var post = {
        id: request.body.id,
    };
    if (post.id == undefined || post.id == null || post.id.trim() == "") {
        response.json({ state: false, mensaje: "el campo id es obligatorio" });
        return false;
    }

    proyectosModel.CargarId(post, function (respuesta) {
        if (respuesta.state == false) {
        response.json({
            state: false,
            mensaje: "se presento un error al cargar",
        });
        } else {
        response.json(respuesta);
        }
    });
};

proyectosController.Actualizar = function (request, response) {

    var post = {
        id: request.body.id,
        nombreProyecto: request.body.nombreProyecto,
        descripcion: request.body.descripcion,
        objetivo: request.body.objetivo,
        fechaEntrega: request.body.fechaEntrega,
        prosupuesto:request.body.prosupuesto,
        miembros:request.body.miembros,
        tareas:request.body.tareas,
    };
  
  if(post.id){
    if (
      post.id == undefined ||
      post.id == null ||
      post.id.trim() == ""
    ) {
      response.json({ state: false, mensaje: "el id del proyecto es obligatorio" });
      return false;
    }
  }
  if(post.nombreProyecto){
    if (
      post.nombreProyecto == undefined ||
      post.nombreProyecto == null ||
      post.nombreProyecto.trim() == ""
    ) {
      response.json({ state: false, mensaje: "el campo nombre del proyecto es obligatorio" });
      return false;
    }
  }
  if(post.descripcion){
    if (
      post.descripcion == undefined ||
      post.descripcion == null ||
      post.descripcion.trim() == ""
    ) {
      response.json({ state: false, mensaje: "el campo descripcion es obligatorio" });
      return false;
    }
  }
  if(post.objetivo){
    if (
      post.objetivo == undefined ||
      post.objetivo == null ||
      post.objetivo.trim() == ""
    ) {
      response.json({ state: false, mensaje: "el campo objetivo es obligatorio" });
      return false;
    }
  }
  if(post.fechaEntrega){
    if (
      post.fechaEntrega == undefined ||
      post.fechaEntrega == null ||
      post.fechaEntrega.trim() == ""
    ) {
      response.json({ state: false, mensaje: "el campo fecha de entrega es obligatorio" });
      return false;
    }
  }
  if(post.prosupuesto){
    if (
      post.prosupuesto == undefined ||
      post.prosupuesto == null
      // post.prosupuesto.trim() == ""
    ) {
      response.json({ state: false, mensaje: "el campo prosupuesto es obligatorio" });
      return false;
    }
  }
  if(post.miembros){
    if (
      post.miembros == undefined ||
      post.miembros == null ||
      post.miembros == []
    ) {
      response.json({ state: false, mensaje: "el campo miembros es obligatorio" });
      return false;
    }
  }
  if(post.tareas){
    if (
      post.tareas == undefined ||
      post.tareas == null ||
      post.tareas == []
    ) {
      response.json({ state: false, mensaje: "el campo tareas es obligatorio" });
      return false;
    }
  }
  
  proyectosModel.Actualizar(post, function (respuesta) {
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

proyectosController.Eliminar = function (request, response) {
    var post = {
        id: request.body.id,
    };
    if (post.id == undefined || post.id == null || post.id.trim() == "") {
        response.json({ state: false, mensaje: "el campo en obligatorio id" });
        return false;
    }
    proyectosModel.Eliminar(post, function (respuesta) {
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

proyectosController.CargarTareas = function(request, response) {
  var post = {
    idProyect: request.body.idProyect
  }
  if (post.idProyect == undefined || post.idProyect == null || post.idProyect.trim() == "") {
    response.json({ state: false, mensaje: "el campo en obligatorio id" });
    return false;
  }
  proyectosModel.CargarTareas(post, function(respuesta){
    if (respuesta.state == false) {
      response.json({
          state: false,
          mensaje: "se presento un error",
      });
      } else {
      response.json(respuesta);
      }
  })
}

proyectosController.detalleProyecto = function(request, response) {
  var post = {
    idProyect: request.body.idProyect
  }
  if (post.idProyect == undefined || post.idProyect == null || post.idProyect.trim() == "") {
    response.json({ state: false, mensaje: "el campo en obligatorio id" });
    return false
  }

  proyectosModel.detalleProyecto(post, function(respuesta){
    if (respuesta.state == false) {
      response.json({
        state: false,
        mensaje: "se presento un error",
      });
      } else {
        response.json(respuesta);
      }
  })
}

module.exports.proyectosController = proyectosController;
