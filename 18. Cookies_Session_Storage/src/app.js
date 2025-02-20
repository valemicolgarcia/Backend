//clase cookies

//cookies: pequenios archivos de texto que viven en el navegador del usuario. 
//esta info viaja entre las peticiones del cliente y las rtas del servidor

//datos que puedo guardar
//1. preferencias del usuario (idioma, modo oscuro)
//2. nombre de usuario
//3. productos o servicios deseados
//4. id de las sesiones (lo vemos en un ratito)

//paso 1: instalamos: npm install cookie-parser

//levantamos un servidor mini
import express from "express";
const app = express();
const PUERTO = 8080;
//paso 2: importamos cookie-parser
import cookieParser from "cookie-parser";

//importamos session
import session from "express-session";

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//paso 3: usamos cookieparser a nivel middleware
//le mandamos una clave para firmar
let miClaveSecreta = "tinkiwinki";
app.use(cookieParser(miClaveSecreta));
//middelware de session
app.use(session({
    secret: 'secretCoder',
    resave: true, //me permite mantener activa la sesion frente a la inactividad del usuario
    //resave me permite mantener activa la sesion frente a la inactividad del usuario
    saveUninitialized: true
    //me permite guardar cualquier sesion cuando el objeto no tenga nada para contener


}));


//ruta
app.get("/", (req, res) => {
    res.send("Hola mundo");
})

//
app.listen(PUERTO, () => console.log("escuchando en el puerto 8080"));


//ruta para setear una cookie
app.get("/setcookie", (req, res) => {
    //voy a utilizar el objeto res para asignarle una cookie al cliente
    //lo almacenamos en formato "clave/valor" 
    //esta cookie vive hasta ser eliminada, ya que no tiene fecha de expiracion
    //si quiero que tenga tiempo de vida limitado, entonces puedo hacer lo siguiente:
    res.cookie("coderCookie", "mi primer cookie", { maxAge: 30000000 }).send("cookie seteada");
    //le agregue 3000ms: 3s, desp de ese tiempo se borra

})

//leemos el valor de una cookie
app.get("/leerCookie", (req, res) => {
    res.send(req.cookies.coderCookie);
})

//borramos una cookie:
app.get("/borrarCookie", (req, res) => {
    res.clearCookie("coderCookie").send("cookie eliminada");
})

//enviamos una cookie firmada
app.get("/cookiefirmada", (req, res) => {
    res.cookie("cookieFirmada", "mensaje secreto", { signed: true }).send("cookie firmada enviada");
})

//recuperamos una cookie firmada
app.get("/recuperamosCookieFirmada", (req, res) => {
    //ahora para recuperar la cookie tengo que utilizar signedCookies
    let valorCookie = req.signedCookies.cookieFirmada;

    //si el valor de la cookie se modifico esto es false
    if (valorCookie) {
        res.send("cookie recuperada: " + valorCookie);
    } else {
        res.send("cookie invalida");
    }
})

//sesiones: con las sesiones podemos mantener informacion sobre el cliente

//caracteristicas:
//1. la informacion que se quiere guardar se almacena del lado del servidor
//2. del lado del cliente se crea un identificador unico para acceder a la informacion
//3. los datos almacenados en session se borran al cerrar el navegator
//4. se usa para guardar datos del usuario al iniciar sesion

//instalamos mpm install express-session
//importamos
//middlea=ware

//ruta ejemplo de session
app.get("/session", (req, res) => {
    //si al conectarme la session ya existe, aumento el contador
    if (req.session.counter) {
        req.session.counter++;
        res.send("se visito el sitio " + req.session.counter + "veces");
    } else {
        req.session.counter = 1;
        res.send("bienvenidos");
    }
})

//si te queres desloguear, destruis la session
app.get("/logout", (req, res) => {
    //para eliminar datos de una variable de session, se utiliza req, y el metodo destroy
    req.session.destroy((error) => {
        if (!error) {
            res.send("sesion cerrada");
        } else {
            res.send({ status: "error en el logout", body: error });
        }
    })
})

//login con session

app.get("/login", (req, res) => {
    let { usuario, pass } = req.query;
    if (usuario === "tinki" && pass === "winki") {
        req.session.user = usuario;
        res.send("el inicio de sesion fue exitoso");
    } else {
        res.send("datos incorrectos");
    }
})

//previo a eso creamos el middleware PROPIO
function auth(req, res, next) {
    if (req.session.user === "tinki") {
        return next();
    }
    res.status(401).send("error de autorizacion");
}

//ruta privada que requiere que el usuario se identifique
app.get("/privado", auth, (req, res) => {
    res.send("si llegas hasta aca es porque estas logueado correctamente");
})