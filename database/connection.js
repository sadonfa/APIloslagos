const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/loslagos_sorteo");

        console.log("Conectados correctamente a la base de datos mi_blog")
    } catch (error) {
        console.log(error);
        throw new Error("Nose a podido conectar a la base de datos");
    }
}

module.exports = {
    connection
}