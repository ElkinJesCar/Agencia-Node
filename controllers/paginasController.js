// controllers/paginasController.js

import { Viaje } from '../models/Viaje.js';
import { Testimonios } from '../models/Testimonios.js';

const paginaInicio = async (req, res) => {
    const promises = [];

    promises.push(Viaje.findAll({
        limit: 3
    }));

    promises.push(Testimonios.findAll({
        limit: 3
    }));

    try {
        const resultado = await Promise.all(promises);

        console.log(resultado[0]);

        res.render('inicio', {
            viajes: resultado[0],
            testimoniales: resultado[1],
            clase: 'home',
            page: 'Inicio'
        });
    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Proximos viajes',
        viajes,
    });
}

const paginaTestimoniales = async (req, res) => {
    try {
        const testimoniales = await Testimonios.findAll();
        res.render('testimoniales', {
            testimoniales,
            page: 'Testimoniales'
        });
    } catch (error) {
        console.log(error)
    }
}

// Función para recibir un nuevo testimonio mediante un POST
const agregarTestimonio = async (req, res) => {
    const { nombre, correo, mensaje } = req.body; // Cambiar testimonio por mensaje

    // Validar que los campos no estén vacíos
    if (!nombre || !correo || !mensaje) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        // Crear un nuevo testimonio en la base de datos
        await Testimonios.create({
            nombre,
            correo,  // Asegúrate de tener este campo en el modelo
            mensaje  // Asegúrate de tener este campo en el modelo
        });

        // Redirigir a la página de testimoniales después de guardar
        res.redirect('/testimoniales');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al agregar el testimonio');
    }
}

const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug } });

        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        });
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    agregarTestimonio, // Exportar la nueva función
    paginaDetalleViaje
}
