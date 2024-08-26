const studentsModel = require('../models/studentsModel');

class studentsController {

    async Todos() {
        try {
            const students = await studentsModel.Todos();
            return students;
        } catch (error) {
            throw new Error("Error al obtener estudiantes: " + error.message);
        }
    }

    async Uno(id) {
        try {
            const student = await studentsModel.Uno(id);
            return student;
        } catch (error) {
            throw new Error("Error al obtener estudiante: " + error.message);
        }
    }

    async Crear(datos) {
        try {
            const newStudent = await studentsModel.Crear(datos);
            return newStudent;
        } catch (error) {
            throw new Error("Error al crear estudiante: " + error.message);
        }
    }

    async Editar(id, datos) {
        try {
            const updatedStudent = await studentsModel.Editar(id, datos);
            return updatedStudent;
        } catch (error) {
            throw new Error("Error al editar estudiante: " + error.message);
        }
    }

    async Eliminar(id) {
        try {
            await studentsModel.Eliminar(id);
        } catch (error) {
            throw new Error("Error al eliminar estudiante: " + error.message);
        }
    }

    async Contar(req, res) {
        try {
            const total = await studentsModel.Contar();
            res.render('count', { total }); // Renderiza la vista 'count' con el total de estudiantes
        } catch (error) {
            console.error("Error al contar estudiantes:", error.message);
            res.status(500).render('error', { error: "Error al contar estudiantes" });
        }
    }
    async BuscarNombre(nombre) {
        try {
            console.log('Buscando estudiantes por nombre:', nombre); // Verificar nombre
            const students = await studentsModel.MostrarNombre(nombre);
            return students;
        } catch (error) {
            console.log('Error al buscar estudiante por nombre:', error.message); // Log de error
            throw new Error("Error al buscar estudiante por nombre: " + error.message);
        }
    }

    async  MostrarCarrera(carrera) {
        try {
            console.log("Carrera buscada:", carrera);
            const students = await studentsModel.MostrarCarrera(carrera);
            return students;
        } catch (error) {
            console.error("Error en MostrarCarrera:", error.message);
            throw new Error("Error al buscar estudiante por carrera: " + error.message);
        }
    }
}
module.exports = new studentsController();