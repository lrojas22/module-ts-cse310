"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
//import fs from 'fs/promises';
const path_1 = __importDefault(require("path"));
const FileManager_1 = require("./classes/FileManager");
const recursion_1 = require("./recursion");
const app = (0, express_1.default)();
const manager = new FileManager_1.FileManager();
(0, recursion_1.countdown)(5);
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const unicName = `${Date.now()}-${file.originalname}`;
        cb(null, unicName);
    }
});
const upload = (0, multer_1.default)({ storage });
app.use(express_1.default.static('public'));
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
    }
    catch (error) {
        res.send('Error leyendo carpeta uploads');
    }
});
app.get('/download/:filename', async (req, res) => {
    const filename = path_1.default.basename(req.params.filename);
    try {
        await manager.validateFile(filename);
        res.download(path_1.default.join('uploads', filename));
    }
    catch (error) {
        if (error instanceof FileManager_1.FileNotFoundError) {
            res.status(404).send(error.message);
        }
        else {
            console.error(error);
            res.status(500).send('Error al descargar el archivo');
        }
    }
});
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en puerto ${port}`);
});
