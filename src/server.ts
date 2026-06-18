import express from 'express';
import multer from 'multer';
//import fs from 'fs/promises';
import path from 'path';

import { FileManager, FileNotFoundError } from './classes/FileManager';
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
app.get('/download/:filename', async (req, res) => {

    const filename = path.basename(req.params.filename);

    try {
        await manager.validateFile(filename);
        res.download(path.join('uploads', filename));
    } catch (error) {
        if (error instanceof FileNotFoundError) {
            res.status(404).send(error.message);
        } else {
            console.error(error);
            res.status(500).send('Error al descargar el archivo');
        }
    }

});

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor ejecutándose en puerto ${port}`);
});