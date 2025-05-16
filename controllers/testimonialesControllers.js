import { Testimonios } from '../models/Testimonios.js';

// Guardar un nuevo Testimonial
const guardarTestimonial = async (req, res) => {
    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    // Validar los datos recibidos
    if (!nombre) {
        errores.push({ mensaje: 'El nombre es obligatorio' });
    }
    if (!correo) {
        errores.push({ mensaje: 'El correo es obligatorio' });
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
        errores.push({ mensaje: 'El correo no es válido' });
    }
    if (!mensaje) {
        errores.push({ mensaje: 'El mensaje es obligatorio' });
    }

    // Si hay errores, devolverlos al cliente
    if (errores.length > 0) {
        return res.status(400).json({
            errores
        });
    }

    try {
        // Crear el nuevo Testimonial
        const nuevoTestimonial = new Testimonios({
            nombre,
            correo,
            mensaje
        });

        // Guardar el Testimonial en la base de datos
        await nuevoTestimonial.save();

        // Enviar una respuesta exitosa
        res.status(201).json({
            mensaje: 'Testimonial guardado correctamente',
            testimonial: nuevoTestimonial
        });
    } catch (error) {
        // Manejar cualquier error de la base de datos o servidor
        console.log(error);
        res.status(500).json({
            mensaje: 'Hubo un error al guardar el testimonial',
            error: error.message
        });
    }
};

// Obtener todos los testimonios
const obtenerTestimoniales = async (req, res) => {
    try {
        const testimoniales = await Testimonios.findAll();

        // Verificar si no hay testimonios
        if (!testimoniales || testimoniales.length === 0) {
            return res.status(404).json({
                mensaje: 'No se encontraron testimoniales',
                error: 'La base de datos está vacía o no hay testimoniales disponibles.'
            });
        }

        res.status(200).json(testimoniales);
    } catch (error) {
        // Manejar errores de la base de datos
        console.log(error);
        res.status(500).json({
            mensaje: 'Hubo un error al obtener los testimoniales',
            error: error.message
        });
    }
};

export { guardarTestimonial, obtenerTestimoniales };
