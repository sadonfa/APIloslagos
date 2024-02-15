const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

// libreria para acceder a ficheros estaticos
const path = require("path");

// Inicializar app 
console.log("App de node arrancada");

// conectar a base de datos 
connection();

// creando servidor Node 
const app = express();
const puerto = 3900;

// configurando cors 
app.use(cors());

// convertir body a objeto js 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// crear rutas
const router_article = require("./routers/article")

app.use("/", express.static("build", { redirect: false }))
app.use("/api", router_article)


app.get("*", (req, res) => {
    return res.sendFile(path.resolve('build/index.html'))
});

app.get("/probando", (req, res) => {
    console.log("Se a ejecutado el enpoint provando");

    return res.status(200).json({
        curso: "Master en React",
        autor: "Victor Robles",
        url: "victorrobles.es/master-react"
    });
});

// crear servidor y escuchar peticiones 
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto " + puerto);
})