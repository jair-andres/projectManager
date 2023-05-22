var usuariosController = require("./api/controladores/usuariosController.js").usuariosController

app.post('/Usuarios/Guardar',function(request, response) {
    usuariosController.Guardar(request, response)
})

app.post('/Usuarios/CargarTodas',function(request, response) {
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