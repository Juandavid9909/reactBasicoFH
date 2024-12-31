const { Router } = require("express");

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Todas tienen que pasar por la validación del JWT
router.use(validarJWT);

// Obtener eventos
router.get("/", getEventos);

// Crear un nuevo evento
router.post("/", [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de fin es obligatoria").not().isEmpty(),
    validarCampos
], crearEvento);

// Actualizar evento
router.put("/:id", actualizarEvento);

// Borrar evento
router.put("/:id", eliminarEvento);