import fs from 'fs/promises';

export class FileManager {

    async getFiles(): Promise<string[]> {
        return await fs.readdir('uploads');
    }

}