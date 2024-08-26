const { token } = require('morgan');
const UsuarioModel = require('../models/usuariosModel');
const jwt = require('jsonwebtoken');

class UsuarioController {

    IniciarSesion(usuario) {
        return new Promise((resolve, reject) => {
         UsuarioModel.IniciarSesion(usuario)
         .then((token) => { 
                // Assuming result contains both token and user details
                resolve(token); 
            })
                .catch((e)=>{
                    reject(e);
            })
        })
       
    }

    Registrarse(usuario) {
            return new Promise((resolve, reject) =>{
                UsuarioModel.Registrarse(usuario)
                .then((token)=> {
                    resolve(token);
                });
        }) 
    }

    Decodificar(token){
        return new Promise((resolve, reject) => {
            UsuarioModel.Decodificar(token)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });

        })
    }

    async CerrarSesion(cookie) {
        try {
            await UsuarioModel.CerrarSesion(cookie);
        } catch (err) {
            throw err;
        }
    }

    async Editar(id, datos) {
        try {
            await UsuarioModel.Editar(id, datos);
        } catch (err) {
            throw err;
        }
    }

    async Obtener() {
        try {
            const students =  await UsuarioModel.Obtener();
            return students;
        } catch (err) {
            throw new err('error al obtener los estudiantes' + err.message);
        }
    }

    async BorrarUsuario(id) {
        try {
            await UsuarioModel.BorrarUsuario(id);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new UsuarioController();