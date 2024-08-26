const pool = require('../conexion');

class studentsModel {

    Todos() {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM students", (error, resultados) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultados);
            });
        });
    }

    Uno(id) {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM students WHERE id = ?", [id], (error, resultado) => {
                if (error) {
                    return reject(error);
                }
                if (resultado.length === 0) {
                    return reject("Estudiante no encontrado");
                }
                resolve(resultado[0]);
            });
        });
    }

    Crear(estudiantePost) {
        return new Promise((resolve, reject) => {
            let nombre = estudiantePost.nombre;
            let edad = estudiantePost.edad;
            let carrera = estudiantePost.carrera;

            pool.query(`INSERT INTO students (nombre, edad, carrera) VALUES (?, ?, ?)`, [nombre, edad, carrera], (err, result) => {
                if (err) {
                    return reject(err);
                }
                pool.query(`SELECT * FROM students WHERE id = ?`, [result.insertId], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result[0]);
                });
            });
        });
    }

    Editar(id, estudiante) {
        return new Promise((resolve, reject) => {
            const { nombre, edad, carrera } = estudiante;
            pool.query(
                "UPDATE students SET nombre = ?, edad = ?, carrera = ? WHERE id = ?",
                [nombre, edad, carrera, id],
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                }
            );
        });
    }

    Eliminar(id) {
        return new Promise((resolve, reject) => {
            pool.query(
                "DELETE FROM students WHERE id = ?",
                [id],
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                }
            );
        });
    }

    Contar() {
        return new Promise((resolve, reject) => {
            pool.query("SELECT COUNT(*) AS total FROM students", (error, resultado) => {
                if (error) {
                    return reject(error);
                }
                resolve(resultado[0].total);
            });
        });
    }

    MostrarNombre(nombre) {
        return new Promise((resolve, reject) => {
            console.log("Buscando estudiantes con nombre:", nombre); // Log para verificar el nombre
            pool.query(
                "SELECT * FROM students WHERE nombre LIKE ?",
                [`%${nombre}%`],
                (error, resultados) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(resultados);
                }
            );
        });
    }
    
    MostrarCarrera(carrera) {
        return new Promise((resolve, reject) => {
            console.log("Consulta SQL:", "SELECT * FROM students WHERE carrera = ?", [carrera]);
            pool.query(
                "SELECT * FROM students WHERE carrera = ?",
                [carrera],
                (error, resultados) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(resultados);
                }
            
            );
        });
    }
}
module.exports = new studentsModel();