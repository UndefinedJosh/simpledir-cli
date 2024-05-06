const fs = require('fs').promises;
const path = require('path');

export class FileManager {
    static async createFile(filePath: string) {
        try {
            await fs.writeFile(filePath, '');
            console.log(`File ${path.basename(filePath)} created successfully.`);
        } catch (error) {
            console.error('File creation failed:', error);
        }
    }
}