import express from 'express';
import multer from 'multer';
//import fs from 'fs/promises';
import path from 'path';

import { FileManager } from './classes/FileManager';
import { countdown } from './recursion';

const app = express();

const manager = new FileManager();

countdown(5);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const unicName =`${Date.now()}-${file.originalname}`;
        cb(null, unicName);  
    }                                               
});

const upload = multer({storage});

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body>
                <h1>Mi File Uploader</h1>

                <form action="/upload" method="POST" enctype="multipart/form-data">
                    <input type="file" name="file">
                    <button>Upload</button>
                </form>

                <br>

                <a href="/files">Ver archivos</a>

            </body>
        </html>
    `);
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.send(`
                <html>
                <head>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body>
                <h1>Archivo recibido correctamente</h1>
                <p>Subiste: ${req.file?.originalname}</p>
                <a href="/files">Ver archivos</a>
                <br>
                <a href="/">Volver al inicio</a>
            </body>
        </html>
    `);
});

app.get('/files', async (req, res) => {

    try {

        const files = await manager.getFiles();
         let html = `
            <html>
            <head>
                <link rel="stylesheet" href="/style.css">
            </head>
                <body>
                    <h1>Archivos Disponibles</h1>
                    <ul>
        `;
        files.forEach(file => {
           html += `
                <li>
                    ${file}
                    <a href="/download/${file}">Descargar</a>
                </li>
            `;
        });
        html += `
                    </ul>
                    <a href="/">Volver al inicio</a>
                </body>
            </html>
        `;

        res.send(html);

    } catch (error) {

        res.send('Error leyendo carpeta uploads');

    }

});
app.get('/download/:filename', (req, res) => {

    const filename = req.params.filename;

    res.download(`uploads/${filename}`);

});

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor ejecutándose en puerto ${port}`);
});