# Lista-Estudiantes3

Pasos para la instalación del repositorio y configuración del programa 
1.	Clonar el repositorio
Abrimos Visual Studio Code y seleccionamos una carpeta vacia, luego abrimos el terminal (Ctrl+Ñ), y copiar el código:
git clone https://github.com/Masv93/Lista-Estudiantes3
2.	Crear archivo .env:

BASEDATOSNOMBRE= lista-estudiantes
BASEDATOSCLAVE=
BASEDATOSHOST= localhost
BASEDATOSUSUARIO= root
JWT_SECRET= secretJWT_clave

3.	Instalar dependencias: 
Asegúrate de tener Node.js y npm instalados, ejecuta el siguiente código en caso que no lo tengas:
npm install
4.	Configuración de la Base de Datos
Instala MySQL (si no lo tienes instalado):
Importa la estructura de la base de datos: En el repositorio se proporcionará un archivo .sql, impórtalo a tu base de datos utilizando la configuración de XAMPP para  MySQL:
5.	Abrir XAMPP y ejecutar APACHE y MYSQL.

6.	Iniciar la aplicación:
En el terminal ejecuta el código siguiente para ejecutar el servidor:
npm start
7.	Abre tu navegador web y navega a http://localhost:4000/usuarios
Esta es una vista ejs creada para hacer las operaciones principales del sistema	


Descripcion del sistema:

El siguiente programa es una lista de estudiantes en donde hace las siguientes operaciones: Mostrar todos los estudiantes: Mostrar estudiante por ID Crear estudiante Actualizar estudiante por ID Eliminar por ID Contar el numero total de estudiantes Buscar por nombre Mostrar por carrera Toda esta información se guarda en una base de datos mysql y tiene mejoras incluidas como inicio de sesion con un login. cifrado de clave a través de bcrypt y jwt para almacenar la sesión.
