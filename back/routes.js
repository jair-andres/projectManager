var usuariosController = require("./api/controladores/usuariosController.js").usuariosController

var validarSession = function(request, response, next) {
  // console.log("request.session.rol ===>",request.session.rol)
  if (request.session.rol == undefined) {
    response.json({state:false,error:true,mensaje:"Para ser uso de esta api tiene que iniciar sesion"})
  }else {
    next()
  }
}

var validarAdmin = function(request, response, next) {
  // console.log("request.session.rol ===>",request.session.rol)
  if (request.session.rol == undefined || request.session.rol == null || request.session.rol == "") {
    response.json({state:false,error:true,mensaje:"Para ser uso de esta api tiene que iniciar sesion"})
  }else if(request.session.rol == "Cliente"){
    response.json({state:false,error:true,mensaje:"Para ser uso de esta api tiene que ser administrador"})
  } else {
    next()
  }
}

app.post('/Usuarios/Guardar',function(request, response) {
  usuariosController.Guardar(request, response)
})

app.post('/Usuarios/CargarTodas',validarSession,function(request, response) {
  usuariosController.CargarTodas(request, response)
})

app.post('/Usuarios/CargarId',validarSession,function(request, response) {
  usuariosController.CargarId(request, response)
})
app.post('/Usuarios/Buscar',validarSession,function(request, response) {
  usuariosController.Buscar(request, response)
})

app.post('/Usuarios/Actualizar',validarSession,function(request, response) {
  usuariosController.Actualizar(request, response)
})

app.post('/Usuarios/Eliminar',validarSession,function(request, response) {
  usuariosController.Eliminar(request, response)
})

app.post("/Usuarios/Login",function(request, response) {
  usuariosController.Login(request, response)
})

app.post("/Usuarios/logout", function(request, response) {
  request.session.destroy()
  response.json({state:true,mensaje:"cerrado la sesion"})
})
// Mis Proyectos
app.post('/Usuarios/CargarTodosMisProyectos',validarSession,function(request, response) {
  usuariosController.CargarTodosMisProyectos(request, response)
})

// Pqrs
var pqrsController = require("./api/controladores/pqrsController.js").pqrsController

app.post("/Pqrs/Guardar",function(request, response) {
  pqrsController.Guardar(request, response)
})

app.post("/Pqrs/CargarTodas",validarAdmin,function(request, response) {
  pqrsController.CargarTodas(request, response)
})

app.post("/Pqrs/CargarId",validarAdmin,function(request, response) {
  pqrsController.CargarId(request, response)
})

app.post("/Pqrs/Actualizar",validarAdmin,function(request, response) {
  pqrsController.Actualizar(request, response)
})

// Sesion
app.post("/miData",function(request, response) {
  // console.log("On utile /miData")
  response.json({
    id:request.session.idUser,
    nombre:request.session.nombre,
    email:request.session.email,
    password:request.session.password,
    rol:request.session.rol})
})

//prueba
app.post("/state", function(request, response) {
  response.json(request.session)
})

// prueba archivos
var filesController = require("./api/controladores/filesController.js").filesController

app.post("/files/:carpeta/:carpeta/:id", function(request, response) {
  filesController.SubirArchivos(request, response)
})

// newsletter
var newslettersController = require("./api/controladores/newslettersController.js").newslettersController

app.post("/Newsletters/Guardar",function(request, response) {
  newslettersController.Guardar(request, response)
})

app.post("/Newsletters/CargarTodas",validarSession,validarAdmin,function(request, response) {
  newslettersController.CargarTodas(request, response)
})

app.post("/Newsletters/Eliminar",validarSession,validarAdmin,function(request, response) {
  newslettersController.EliminarNewsletters(request, response)
})


// PROYECTOS

var proyectosController = require("./api/controladores/proyectosController.js").proyectosController

app.post('/Proyectos/Guardar',validarSession,function(request, response) {
  proyectosController.Guardar(request, response)
})

app.post('/Proyectos/CargarTodas',validarSession,function(request, response) {
  proyectosController.CargarTodas(request, response)
})

app.post('/Proyectos/CargarId',validarSession,function(request, response) {
  proyectosController.CargarId(request, response)
})

app.post('/Proyectos/Actualizar',validarSession,function(request, response) {
  proyectosController.Actualizar(request, response)
})

app.post('/Proyectos/Eliminar',validarSession,function(request, response) {
  proyectosController.Eliminar(request, response)
})

app.post('/Proyectos/CargarTareas',validarSession,function(request, response) {
  proyectosController.CargarTareas(request, response)
})

app.post('/Proyectos/detalleProyecto',validarSession,function(request, response) {
  proyectosController.detalleProyecto(request, response)
})

var tareasController = require("./api/controladores/tareasController.js").tareasController

app.post('/Tareas/Consultar',validarSession,function(request, response) {
  tareasController.Consultar(request, response)
})

app.post('/Tareas/Guardar',validarSession,function(request, response) {
  tareasController.Guardar(request, response)
})

app.post('/Tareas/Actualizar',validarSession,function(request, response) {
  tareasController.Actualizar(request, response)
})

app.post('/Tareas/Eliminar',validarSession,function(request, response) {
  tareasController.Eliminar(request, response)
})

