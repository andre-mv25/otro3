const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
    res.send('hola mundo');
});

// 404 handler
app.use((_req, res) => {
    res.status(404).send('Ruta no encontrada');
});

// error handler
app.use((err, _req, res, _next) => {
    console.error('Error:', err.message);
    res.status(500).send('Error interno del servidor');
});

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// graceful shutdown
process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
});