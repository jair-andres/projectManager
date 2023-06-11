var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel;
var usuariosController = {};

function averiguarFormatoCorreo(correo) {
  let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
  // let regex_2 = new RegExp(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)
  if (regex.test(correo)) {
    return (true)
  } else {
    return (false)
  }
}

usuariosController.Guardar = function (request, response) {
  var post = {
    nombre: request.body.nombre,
    email: request.body.email,
    password: request.body.password,
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
    response.json({ state: false, mensaje: "El campo password es obligatorio" });
    return false;
  }

  usuariosModel.validarEmailyNombre(post, function (existe) {
    if (existe.state == false) {
      response.json({
        state: false,
        mensaje:
          "El registro no se pudo almacenar, el email o usuario ya esta en uso",
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
        state: false,
        mensaje: "se presento un error al guardar",
      });
    } else {
      response.json(respuesta);
    }
  });
};

usuariosController.CargarId = function (request, response) {
  var post = {
    id: request.body.id,
  };
  if (post.id == undefined || post.id == null || post.id.trim() == "") {
    response.json({ state: false, mensaje: "el campo id es obligatorio" });
    return false;
  }

  usuariosModel.CargarId(post, function (respuesta) {
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

usuariosController.Buscar = function (request, response) {
  var post = {
    foo: request.body.foo,
  };
  if (post.foo == undefined || post.foo == null || post.foo.trim() == "") {
    // response.json({ state: false, mensaje: "el campo de buscqueda esta vacio" });
    return false;
  }

  usuariosModel.Buscar(post, function (respuesta) {
    if (respuesta.state == false) {
      response.json({
        state: false,
        mensaje: "se presento un error a la busqueda",
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
    misProyectos: request.body.misProyectos,
    misTareas: request.body.misTareas
  };
  var formatoDelCorreo = averiguarFormatoCorreo(post.email)

  if(post.nombre){
    if (
      post.nombre == undefined ||
      post.nombre == null ||
      post.nombre.trim() == ""
    ) {
      response.json({ state: false, mensaje: "El campo nombre es obligatorio" });
      return false;
    }
  }
  if(post.email){
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
  }
  if(post.password){
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
  }
  if(post.id){
    if (post.id == undefined || post.id == null || post.id.trim() == "") {
      response.json({ state: false, mensaje: "el campo en obligatorio id" });
      return false;
    }
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
  var formatoDelCorreo = averiguarFormatoCorreo(post.email)
  if (
    (
      post.email == undefined ||
      post.email == null ||
      post.email.trim() == ""
    )
    &&
    (
      post.password == undefined ||
      post.password == null ||
      post.password.trim() == ""
    )
  ) {
    response.json({ state: false, mensaje: "El campo email y password es obligatorio" });
    return false;
  }else {
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
  }

  usuariosModel.Login(post, function (respuesta) {
    if (respuesta.state == false) {
      response.json({
        state: false,
        mensaje: "se presento un error al guardar",
      });
    } else {
      if (respuesta.datos.length == 0) {
        response.json({ state: false, mensaje: "El email y la contraseña no coinciden" });
      } else {
        // console.log(respuesta.datos[0]);

        // request.session.idUser = respuesta.datos[0].id;
        request.session.idUser = respuesta.datos[0].id;
        request.session.nombre = respuesta.datos[0].nombre;
        request.session.email = respuesta.datos[0].email;
        request.session.rol = respuesta.datos[0].rol;
        // request.session.password = respuesta.datos[0].password;

        console.log(request.session.email);
        console.log(request.session.idUser);

        //response.json(respuesta)
        response.json({
          state: true,
        //   mensaje: "logeo correctamente",
          mensaje: `Bienvenido ${respuesta.datos[0].nombre}`,
          rol: respuesta.datos[0].rol,
        });
      }
    }
  });
};

usuariosController.CargarTodosMisProyectos = function (request, response) {
  var post = {
    idUser: request.body.idUser
  };
  if (post.idUser == undefined  || post.idUser == null  || post.idUser.trim() == "") {
    response.json({ state: false, mensaje: "el campo en obligatorio id" });
    return false;
  }
  usuariosModel.CargarTodosMisProyectos(post, function (respuesta) {
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

usuariosController.CargarTodosMisTareas = function (request, response) {
  var post = {
    idUser: request.body.idUser
  };
  if (post.idUser == undefined  || post.idUser == null  || post.idUser.trim() == "") {
    response.json({ state: false, mensaje: "el campo en obligatorio id" });
    return false;
  }
  usuariosModel.CargarTodosMisTareas(post, function (respuesta) {
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
module.exports.usuariosController = usuariosController;
