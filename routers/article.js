const { Router } = require("express");
const router = Router();
const ConcursoController = require("../controllers/concurso");



// Rutas utiles 

router.post("/crear", ConcursoController.add)
router.get("/clientes", ConcursoController.list)

// router.get("/articulo/:id", ArticleController.uno)
// router.delete("/articulo/:id", ArticleController.del)
// router.put("/articulo/:id", ArticleController.edit)
// router.post("/subir-imagen/:id", [subida.single("file0")], ArticleController.upload)
// router.get("/imagen/:fichero", ArticleController.image)
// router.get("/buscar/:busqueda", ArticleController.search)

module.exports = router;