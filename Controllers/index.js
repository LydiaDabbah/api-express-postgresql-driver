

// req ---> recibe los datos de la peticion
// res ---> responde al cliente
// req.params ---> Recibimos los datos que llegan por la URL pero son obligatorios
// req.query ---> Recibimos los datos que llegan por la URL pero son opcionales
// req.body ---> Recibimos los datos que llegan en el body

const connect = require('../database')
// connect.query nos permite hacer peticiones a la base de datos con sentencias SQL.
// para usar parametros desde las sentencias se usa el signo $ que el numero que le sigue es la posicion del array en la que esta el parametro
//  Controladores de Mascotas
const crearMascota = async (req, res) => {
  const { nombre, tipo, raza, edad, propietario_id } = req.body

  try {
    const dbResponse = await connect.query(
      'INSERT INTO mascotas (nombre, tipo, raza, edad, propietario_id) VALUES ($1, $2, $3, $4, $5)',
      [nombre, tipo, raza, edad, propietario_id]
      )

      if(dbResponse.rowCount > 0){ 
        res.status(201).send({
          message: "Mascota creada" 
        })
      } else {
        res.status(409).send({
          message: "No se pudo crear la mascota en este momento." 
        })
      }

  } catch (error) {
    res.status(409).send({
      error
    })
  }
}

const obtenerTodasMascotas = async (req, res) => {
  try {
    const dbResponse = await connect.query('SELECT * FROM mascotas')

    res.status(200).send({
      data: dbResponse.rows
    })
  } catch (error) {
    res.status(404).send({
      error
    })
  }
}

const obtenerMascota = async (req, res) => {
  const id = req.params.idMascota // params porque se envia por parametro en la ruta

  try {
    const dbResponse = await connect.query('SELECT * FROM mascotas WHERE id_mascota = $1', [id]) // el $1 quiere decir que es el parametro que esta en la pocision 1 del sigueinet arreglo

    if(dbResponse.rowCount > 0) { //checamos que si se haya encontrado una mascota
      res.status(200).send({
        data: dbResponse.rows
      })
    } else {
      res.status(404).send({
        message: 'Mascota no encontrada'
      })
    }

  } catch (error) {
    res.status(404).send({
      error
    })
  }
}

const modificarMascota = async (req, res) => {
  const id = req.params.idMascota
  const { nombre, tipo, raza, edad, propietario_id } = req.body

  try {
    const dbResponse = await connect.query(`
    UPDATE mascotas
      SET
        nombre = $1,
        tipo = $2,
        raza = $3,
        edad = $4,
        propietario_id = $5
    WHERE id_mascota = $6`,
    [nombre, tipo, raza, edad, propietario_id, id])

    if(dbResponse.rowCount > 0){
      res.status(200).send({
        message: "Mascota modificada" 
      })
    } else {
      res.status(409).send({
        message: "No se pudo modificar la mascota en este momento." 
      })
    }

  } catch (error) {
    res.status(400).send({
      error
    })
  }
}

const eliminarMascota = async (req, res) => {
  const id = req.params.idMascota

  try {
    const dbResponse = await connect.query(`DELETE FROM mascotas WHERE id_mascota = $1`, [id])

    if(dbResponse.rowCount > 0){
      res.status(200).send({
        message: "Mascota eliminada" 
      })
    } else {
      res.status(409).send({
        message: "No se pudo eliminar la mascota en este momento." 
      })
    }

  } catch (error) {
    res.status(400).send({
      error
    })
  }
}


module.exports = {
  crearMascota,
  obtenerTodasMascotas,
  obtenerMascota,
  modificarMascota,
  eliminarMascota,
 
}

