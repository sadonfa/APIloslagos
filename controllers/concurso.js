const { request } = require("express");
const validator = require("validator");
const Clientes = require("../models/Loslagos");
const { validatorCliente } = require("../helpers/validator");

const test = (req, res) => {

    return res.status(200).json({
        mensaje: "Soy una accion de prueba de mi controlador de articulao "
    })
}

const list = async (req, res) => {
    let consulta = Clientes.find({})

    if (req.params.ultimos) {
        consulta.limit(2)
    }

    consulta.sort({ date: -1 })
        .then((cliente) => {

            return res.status(200).send({
                status: "success",
                contador: cliente.length,
                cliente
            });
        }).catch((error) => {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado ningun cliente!!"
            });
        })
}


const add = async (req, res) => {
    try {
        // recoger parametros por post a guardar
        let parametros = req.body;

        // validar datos con helper
        validatorCliente(parametros)

        // crear el objeto a guardar 
        const cliente = new Clientes(parametros);

        // guardar articulo en base de datos 
        const clienteSave = await cliente.save();

        // devolver resultado
        return res.status(200).json({
            status: "success",
            articulo: clienteSave,
            mensaje: "Datos de cliente guardado con exito !!"
        })

    } catch (error) {
        return res.status(404).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        })
    }

}

module.exports = {
    test,
    add,
    list
}