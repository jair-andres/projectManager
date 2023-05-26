var usuariosController = require("./api/controladores/usuariosController.js").usuariosController

var validarSession = function(request, response, next) {

  if (request.session.rol == undefined) {
    response.json({state:false,error:true,mensaje:"Para ser uso de esta api tiene que iniciar sesion"})
  }else {
    next()
  }
}

app.post('/Usuarios/Guardar',validarSession,function(request, response) {
  usuariosController.Guardar(request, response)
})

app.post('/Usuarios/CargarTodas',validarSession,function(request, response) {
  usuariosController.CargarTodas(request, response)
})

app.post('/Usuarios/Actualizar',function(request, response) {
  usuariosController.Actualizar(request, response)
})

app.post('/Usuarios/Eliminar',function(request, response) {
  usuariosController.Eliminar(request, response)
})

app.post("/Usuarios/Login", function(request, response) {
  usuariosController.Login(request, response)
})

app.post("/miData", function(request, response) {
  response.json({email:request.session.email,rol:request.session.rol})
})

//prueba
app.post("/state", function(request, response) {
  response.json(request.session)
})

app.post("/Usuarios/logout", function(request, response) {
  request.session.destroy()
  response.json({state:true,mensaje:"cerrado la sesion"})
})

// prueba archivos
var filesController = require("./api/controladores/filesController.js").filesController

app.get("/files/:carpeta/:carpeta/:id", function(request, response) {
  filesController.SubirArchivos(request, response)
})
