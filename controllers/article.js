const { request } = require("express");
const validator = require("validator");
const Article = require("../models/Articles");
const Articles = require("../models/Articles");
const { validatorArticle } = require("../helpers/validator");
const fs = require("fs");
const path = require("path");
const { error } = require("console");

const test = (req, res) => {

    return res.status(200).json({
        mensaje: "Soy una accion de prueba de mi controlador de articulao "
    })
}

const curso = (req, res) => {
    console.log("Se a ejecutado el enpoint provando");

    return res.status(200).json({
        curso: "Master en React",
        autor: "Victor Robles",
        url: "victorrobles.es/master-react"
    });
}

const add = async (req, res) => {
    try {
        // recoger parametros por post a guardar
        let parametros = req.body;

        // // validar datos con helper
        validatorArticle(parametros)

        // crear el objeto a guardar 
        const article = new Article(parametros);

        // guardar articulo en base de datos 
        const articleSave = await article.save();

        // devolver resultado
        return res.status(200).json({
            status: "success",
            articulo: articleSave,
            mensaje: "Articulo guardado con exito"
        })

    } catch (error) {
        return res.status(404).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        })
    }

}

const list = (req, res) => {

    let consulta = Articles.find({})

    if (req.params.ultimos) {
        consulta.limit(2)
    }

    consulta.sort({ date: -1 })
        .then((article) => {

            return res.status(200).send({
                status: "success",
                contador: article.length,
                article
            });
        }).catch((error) => {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado articulos!!"
            });
        })
}

const uno = (req, res) => {
    let id = req.params.id;

    Article.findById(id).then((articulo) => {

        return res.status(200).json({
            status: "success",
            articulo
        })

    }).catch((error) => {
        return res.status(404).json({
            status: "error",
            mensaje: "No se han encontrado articulo!!"
        });
    })
}

const del = (req, res) => {

    let id = req.params.id;

    Article.findOneAndDelete({ _id: id }).then((articulo) => {

        return res.status(200).json({
            status: "success",
            mensaje: "metodo de borrar"
        })
    }).catch((error) => {
        return res.status(404).json({
            status: "error",
            mensaje: "No se ha eliminado articulo"
        });
    })
}

const edit = (req, res) => {

    let id = req.params.id;
    let parametros = req.body;

    // validar datos
    validatorArticle(parametros)

    Article.findOneAndUpdate({ _id: id }, req.body, { new: true }).then((articleUpdate) => {
        return res.status(200).json({
            status: "success",
            articulo: articleUpdate
        })
    }).catch((error) => {
        return res.status(500).json({
            status: "error",
            mensaje: "No se puede actualizar el articulo"
        })
    })
}

const upload = (req, res) => {

    // configurar multer 

    // recoger el fichero de imagen subido 
    // console.logo(req.file)

    // nombre del archivo 
    let nameFile = req.file.originalname;

    // extencion del archivo 
    let file_split = nameFile.split("\.");
    let extension = file_split[1];

    if (extension != "png" && extension != "jpg"
        && extension != "jpeg" && extension != "gif") {
        // borrar archivo 
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: "error",
                mensaje: "Imagen invalida"
            })
        })
    } else {

        let id = req.params.id;


        Article.findOneAndUpdate({ _id: id }, { image: req.file.filename }, { new: true })
            .then((articleUpdate) => {
                return res.status(200).json({
                    status: "success",
                    articulo: articleUpdate,
                    files: req.file
                })
            }).catch((error) => {
                return res.status(500).json({
                    status: "error",
                    mensaje: "No se puede actualizar el articulo"
                })
            })

    }
}

const image = (req, res) => {
    let file = req.params.fichero;
    let path_image = "./images/articles/" + file;

    fs.stat(path_image, (error, existe) => {
        if (existe) {
            return res.sendFile(path.resolve(path_image))
        } else {
            return res.status(404).json({
                status: "error",
                mensaje: "La imagen no existe"
            })
        }
    })
}

const search = (req, res) => {
    // sacar el string de busqueda
    let busqueda = req.params.busqueda

    // fild OR
    Article.find({
        "$or": [
            { "title": { "$regex": busqueda, "$options": "i" } },
            { "content": { "$regex": busqueda, "$options": "i" } }
        ]
    })
        .sort({ date: -1 })
        .then((articleFound) => {

            return res.status(200).json({
                status: "success",
                articleFound
            })
        }).catch((error) => {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado articulos "
            })
        })
    //ejecutar busqueda


}


module.exports = {
    test,
    curso,
    add,
    list,
    uno,
    del,
    edit,
    upload,
    image,
    search
}