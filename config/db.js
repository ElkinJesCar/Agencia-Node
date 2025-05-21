import Sequelize from 'sequelize';

// Configuración de la conexión a la base de datos
const db = new Sequelize('AgenciaNode_searchtone', 'AgenciaNode_searchtone', '38b7c4011dab0d76adfa644afbbf36d4893bac2f', {
    host: '5lbyl.h.filess.io',
    port: 3307,
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
