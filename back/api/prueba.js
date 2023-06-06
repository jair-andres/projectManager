db.usuarios.aggregate([
    {
        $lookup:{
          from: 'proyectos',
          localField: '_id',
          foreignField: 'keyUser',
          as: 'rproyectos',
            pipeline:[
              {
                $lookup:{
                  from: 'tareas',
                  localField: '_id',
                  foreignField: 'keyProyect',
                  as: 'tareas'
                }
              }
            ]
        }
    }
]).pretty()
