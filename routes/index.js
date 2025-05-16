// routes/index.js

import express from 'express';
import {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    agregarTestimonio, // Importar la nueva función
    paginaDetalleViaje
} from '../controllers/paginasController.js';  // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Rutas GET
router.get('/', paginaInicio);
router.get('/nosotros', paginaNosotros);
router.get('/viajes', paginaViajes);
router.get('/viajes/:slug', paginaDetalleViaje);
router.get('/testimoniales', paginaTestimoniales);

// Ruta POST para agregar un testimonio
router.post('/testimoniales', agregarTestimonio); // Aquí estamos usando la nueva función para manejar el POST

export default router;
