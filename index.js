import express from 'express';
import path from 'path'; // Necesario para trabajar con rutas de archivos
import { fileURLToPath } from 'url'; // Para obtener la ruta del archivo actual
import router from './routes/index.js';
import db from './config/db.js';

// Definir __dirname usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar EJS como motor de plantillas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // Esto le dice a Express dónde buscar las vistas

// Conexión a la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch((error) => console.log(error));

// Configurar la carpeta estática (para archivos públicos como CSS, JS, imágenes, etc.)
app.use(express.static('public'));

// Usar las rutas definidas en routes/index.js
app.use('/', router);

// Ruta principal (puedes eliminarla si no la necesitas)
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la página principal!');
});

// Levantar el servidor
app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});
