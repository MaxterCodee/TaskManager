const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware para parsear JSON
app.use(bodyParser.json());

// Servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Leer datos del archivo JSON
app.get('/tasks', (req, res) => {
    fs.readFile('tasks.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.send(JSON.parse(data));
    });
});

// Escribir datos en el archivo JSON
app.post('/tasks', (req, res) => {
    fs.readFile('tasks.json', 'utf8', (err, data) => {
        if (err) throw err;
        const tasks = JSON.parse(data);
        tasks.push(req.body);
        fs.writeFile('tasks.json', JSON.stringify(tasks), (err) => {
            if (err) throw err;
            res.send({ status: 'OK' });
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
