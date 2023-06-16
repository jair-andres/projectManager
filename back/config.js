var config = {}
config.puerto = 3000
config.bd = "projectManagerBD"
config.palabraClave = "palabraClave"
// config.tiempoDeSesion = 300000
config.tiempoDeSesion = 3600000
config.listablanca = [
  "http://127.0.0.1:55000",
  "http://localhost:3000",
  "http://localhost:4200",
  "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop"
]
module.exports.config = config
