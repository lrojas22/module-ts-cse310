import fs from 'fs/promises';

export class FileNotFoundError extends Error {
    constructor(filename: string) {
        super(`El archivo "${filename}" no existe`);
        this.name = 'FileNotFoundError';
    }
}

export class FileManager {

    async getFiles(): Promise<string[]> {
        return await fs.readdir('uploads');
    }

    async fileExists(filename: string): Promise<boolean> {
        try {
            await fs.access(`uploads/${filename}`);
            return true;
        } catch {
            return false;
        }
    }

    async validateFile(filename: string): Promise<void> {
        const exists = await this.fileExists(filename);
        if (!exists) {
            throw new FileNotFoundError(filename);
        }
    }

}