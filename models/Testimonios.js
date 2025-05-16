// models/Testimonios.js
import Sequelize from 'sequelize';
import db from '../config/db.js';

export const Testimonios = db.define('testimoniales', {  // Nombre correcto de la tabla
    nombre: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    }
});
