"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManager = exports.FileNotFoundError = void 0;
const promises_1 = __importDefault(require("fs/promises"));
class FileNotFoundError extends Error {
    constructor(filename) {
        super(`El archivo "${filename}" no existe`);
        this.name = 'FileNotFoundError';
    }
}
exports.FileNotFoundError = FileNotFoundError;
class FileManager {
    async getFiles() {
        return await promises_1.default.readdir('uploads');
    }
    async fileExists(filename) {
        try {
            await promises_1.default.access(`uploads/${filename}`);
            return true;
        }
        catch {
            return false;
        }
    }
    async validateFile(filename) {
        const exists = await this.fileExists(filename);
        if (!exists) {
            throw new FileNotFoundError(filename);
        }
    }
}
exports.FileManager = FileManager;
