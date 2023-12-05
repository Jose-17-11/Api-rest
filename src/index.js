import express from "express";
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';

// Crear una instancia de Express
const app = express();

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Configuraciones
app.set('port', process.env.PORT || 3000);

// Configuración de la conexión a la base de datos
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r5t0p9o8i7u6y',
    database: 'laboratorio_quimica',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Rutas
app.get('/api/:table', async (req, res) => {
    const table = req.params.table;
  
    try {
      // Realizar una consulta a la base de datos para obtener todos los datos de la tabla especificada
      const [rows] = await db.query(`SELECT * FROM ${table}`);
      res.json({ data: rows });
    } catch (error) {
      // Manejar errores y devolver un mensaje de error al cliente
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Publicar archivos estáticos (si es necesario)
// app.use(express.static('public'));

// Iniciar el servidor
app.listen(app.get('port'), () =>
  console.log('Server listening on port', app.get('port'))
);
