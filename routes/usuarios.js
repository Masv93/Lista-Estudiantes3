const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/usuariosController");
const studentsController = require("../controllers/studentsController");
//const checkLogin = require("../auth")

//Renderiza la vista index cuando se accede a la raíz (/).
router.get("/", (req, res) => {
    res.render("index");
});

//Renderiza la vista index cuando se accede a la raíz (/).
router.get('/login', async (req, res) => {
    try {
        const token=req.cookies.token;
        if (!token) {
            return res.status(401).render('login', { error: 'Debe iniciar sesión para acceder a esta página.' });
        }
        // Decodificar el token para obtener información del usuario
        const userData = await UsuarioController.Decodificar(token);
        const students = await UsuarioController.Obtener(); // Obtén la lista de estudiantes desde el controlador
        res.render('login', {user: userData, students: students, error: null }); // Pasa la lista de estudiantes a la vista 'login.ejs'
    } catch (err) {
        console.error('Error al cargar la pagina de login:', err);
        res.status(500).send('Error al cargar el login');
    }
});

//LLama al metodo para iniciar sesión
//obtiene usuariossss
router.post("/", async (req, res) => {
    console.log('Datos recibidos en req.body:', req.body); // Depuración aquí

    try {  
        console.log(req.body);
        console.log('Iniciando sesion');
        
        const result = await UsuarioController.IniciarSesion(req.body);
        console.log('IniciarSesion ha finalizado correctamente:', result);

        // Assuming result contains both token and user details
        const students = await UsuarioController.Obtener(); // If students are needed
        res.render("login", { user: result.user, token: result.token, students: students || [] }); // Pass an empty array if students are not defined
    } catch (err) {
        console.log('Errrrrrrrrrrrror final:', err);

        res.render("login", { user: null, error: err.message, students: [] }); // Ensure students is defined even in case of error
    }
});
//Verificacion de cookies
router.get("/Inicio", (req, res) => {
  
            studentsController.Todos()
                .then((students) => {
                    res.render("Inicio", { token: result, students: students }); // Renderiza la vista Inicio con los datos del usuario y los estudiantes.
                })
                .catch((err) => {
                    res.render("error", { message: err.message, error: err });
                });
        })


//Renderiza la vista Registro para mostrar el formulario de registro.
router.get("/Registro", (req, res) => {
    res.render("Registro");
});

// Llama a un método para registrar un nuevo usuario.
router.post("/Registro", (req, res) => {
    UsuarioController.Registrarse(req.body)
        .then((token) => {
           // res.send(token)
            console.log('hola')
            res.redirect("/usuarios");
        }) 
        .catch((err) => {
            console.error(err);
            res.render("error", { message: err.message, error: err });
        });
});

//Cierra la sesión del usuario usando el token de las cookies.
router.get("/cerrar", (req, res) => {
    UsuarioController.CerrarSesion(req.cookies.token)
        .then(() => {
            res.clearCookie("token");
            res.redirect("/usuarios");
        })
        .catch((err) => {
            res.render("error", { message: err.message, error: err });
        });
});

//permite editar usuario si coincide las cookies, si no. manda error
router.get("/editar", (req, res) => {
            res.render("editarUsuario", { usuario: result }); //Renderiza la vista editarUsuario con la información del usuario para su edición
        })

// Llama a un método para editar el usuario con el id proporcionado y los datos en req.body.
router.put("/editar/:id", (req, res) => {
    UsuarioController.Editar(req.params.id, req.body)
        .then(() => {
            res.redirect("/usuarios");
        })
        .catch((err) => {
            res.render("error", { message: err.message, error: err });
        });
});

//Llama a un método para borrar el usuario con el id proporcionado y los datos en req.body.
router.delete("/borrar/:id", (req, res) => {
    UsuarioController.BorrarUsuario(req.params.id)
        .then(() => {
            res.redirect("/usuarios/lista");
        })
        .catch((err) => {
            res.render("error", { message: err.message, error: err });
        });
});

module.exports = router;
