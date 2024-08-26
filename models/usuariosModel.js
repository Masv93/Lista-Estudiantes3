const pool = require("../conexion");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var token = jwt.sign({foo:'bar'}, 'shhhhh');
const saltRounds=10;

class UsuariosModel {
  
  Registrarse(usuario) {
    return new Promise((resolve, reject) => {
      console.log('claveEEE')
      console.log(usuario.clave)
      usuario.clave = bcrypt.hashSync(usuario.clave, saltRounds)
      console.log(usuario.clave)
      pool.query( `INSERT usuarios SET ?`, usuario,function(err,results, fields){

        if (err) {
            reject(err);
          } else {
            resolve();
          }
      }
      //pool.query( `INSERT INTO usuarios (nombre, usuario, hash, email, rol) VALUES (?, ?, ?, ?, ?)`,
        
        
      );
    });
  }

  IniciarSesion(user) {
    return new Promise((resolve, reject) => {
        // Ensure the query matches the database field name
        pool.query(`SELECT * FROM usuarios WHERE usuario = ?`, [user.user], function (err, results, fields) { 
            if (err) {
                return reject(err); // Handle database errors
            }
            console.log('aqui model iniciar');

            // Ensure results[0] exists before trying to access its properties
            if (results && results.length > 0) {
                const dbUser = results[0];
                console.log(dbUser.clave, user.pass); // Log the values you're comparing

                // Compare the provided password with the stored hashed password
                if (bcrypt.compareSync(user.pass, dbUser.clave)) {
                    var token = jwt.sign({ nombre: dbUser.nombre }, process.env.JWT_SECRET);
                    resolve({ user: dbUser, token: token });
                } else {
                    reject('Clave errada'); // Reject if the password doesn't match
                }
            } else {
                reject('Usuario no encontrado'); // Reject if no user is found
            }
        });
    });
}

  async editarUsuario(id, usuario) {
    const { nombre, email } = usuario;
    return new Promise((resolve, reject) => {
      pool.query(
        "UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?",
        [nombre, email, id],
        (error, usuarioBDs) => {
          if (error) {
            return reject(error);
          }
          resolve(usuarioBDs);
        }
      );
    });
  }

  async borrarUsuario(id) {
    return new Promise((resolve, reject) => {
      pool.query(
        "DELETE FROM usuarios WHERE id = ?",
        [id],
        (error, usuarioBDs) => {
          if (error) {
            return reject(error);
          }
          resolve(usuarioBDs);
        }
      );
    });
  }

  async Decodificar(token) {
    return new Promise((resolve, reject) => {
      if (token) {
        jwt.verify(token, process.env.AUTENTICADOR, (err, decoded) => {
          if (err) {
            return reject(err);
          }
          pool.query(
            `SELECT * FROM usuarios WHERE id = ?`,
            [decoded.id],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                if (result.length === 0) {
                  reject(new Error("No existe el usuario"));
                } else {
                  resolve(decoded);
                }
              }
            }
          );
        });
      } else {
        reject(new Error("No existe token"));
      }
    });
  }

  async CerrarSesion(cookie) {
    return new Promise((resolve, reject) => {
      if (cookie) {
        resolve();
      } else {
        reject(new Error("No hay una sesión iniciada"));
      }
    });
  }

  async Editar(usuarioid, datos) {
    const { contraseñaVieja, contraseñaNueva, nombre, usuario, email } = datos;

    return new Promise(async (resolve, reject) => {
      pool.query(
        `SELECT clave FROM usuarios WHERE id = ?`,
        [usuarioid],
        async (err, result) => {
          if (err) {
            reject(err);
          } else {
            const claveEncriptada = result[0].clave;
            const claveDesencriptada = await bcrypt.compare(contraseñaVieja, claveEncriptada);
            if (claveDesencriptada) {
              const claveCodificada = await bcrypt.hash(contraseñaNueva, 8);
              pool.query(
                `UPDATE usuarios SET nombre = ?, usuario = ?, clave = ?, email = ? WHERE id = ?`,
                [nombre, usuario, claveCodificada, email, usuarioid],
                (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result);
                  }
                }
              );
            } else {
              reject(new Error("Las contraseñas no coinciden"));
            }
          }
        }
      );
    });
  }

  async Obtener() {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM usuarios", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
module.exports = new UsuariosModel();