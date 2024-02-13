const validator = require("validator")

const validatorArticle = (parametros) => {

    // validar datos
    let validar_titulo = !validator.isEmpty(parametros.title) &&
        validator.isLength(parametros.title, { min: 5, max: undefined });
    let validar_contenido = !validator.isEmpty(parametros.content);

    if (!validar_titulo || !validar_contenido) {
        throw new Error("No se ha validado la informacion!!")
    }
}

const validatorCliente = (parametros) => {

    // validar datos
    let validar_name = !validator.isEmpty(parametros.name) &&
        validator.isLength(parametros.name, { min: 5, max: undefined });
    let validar_lastname = !validator.isEmpty(parametros.lastname) &&
        validator.isLength(parametros.lastname, { min: 5, max: undefined });
    let validator_year = !validator.isEmpty(parametros.year);
    let validator_status_civil = !validator.isEmpty(parametros.status_civil) &&
        validator.isLength(parametros.status_civil, { min: 5, max: undefined });
    let validar_city = !validator.isEmpty(parametros.city);
    let validar_district = !validator.isEmpty(parametros.district);
    let validar_address = !validator.isEmpty(parametros.address);
    let validar_occupation = !validator.isEmpty(parametros.occupation);
    let validar_phone = !validator.isEmpty(parametros.phone);
    let validar_mail = !validator.isEmpty(parametros.mail);
    let validar_anfitrion = !validator.isEmpty(parametros.anfitrion);

    if (!validar_name || !validar_lastname || !validator_year
        || !validator_status_civil || !validar_city || !validar_district
        || !validar_address || !validar_occupation || !validar_phone || !validar_mail
        || !validar_anfitrion) {
        throw new Error("No se ha validado la informacion!!")
    }
}


module.exports = {
    validatorArticle,
    validatorCliente
}