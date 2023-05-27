var pqrsModel = require("../modelos/pqrsModel.js").pqrsModel;
var pqrsController = {};

pqrsController.Guardar = function (request, response) {
  var post = {
    idUsuario: request.body.idUsuario,
    email: request.body.email,
    nombre: request.body.nombre,
    asunto: request.body.asunto,
    observacion: request.body.observacion
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
module.exports.pqrsController = pqrsController;
