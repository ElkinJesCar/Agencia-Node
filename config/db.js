import Sequelize from 'sequelize';

// Configuración de la conexión a la base de datos
const db = new Sequelize('viajes', 'root', '', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',  // Cambié 'mysql' por 'mariadb'
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.authenticate()
    .then(() => console.log('Conexión a la base de datos establecida correctamente.'))
    .catch((error) => console.error('No se pudo conectar a la base de datos:', error));


// Exportación por defecto
export default db;
