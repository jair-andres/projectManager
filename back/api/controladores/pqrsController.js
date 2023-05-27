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
  pqrsModel.Guardar(post, function(resultado) {
    if (resultado.state == true) {
        response.json({state:true,mensaje:"registro guardado con exito"})
    }
    else {
        response.json({state:false,mensaje:"se presento un error"})
    }
})
}
module.exports.pqrsController = pqrsController;
