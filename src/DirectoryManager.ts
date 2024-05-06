const fs = require('fs').promises;
const path = require('path');

export class DirectoryManager {
  static async createDirectory(filePath: string) {
    try {
      await fs.mkdir(filePath);
      console.log(`Directory ${path.basename(filePath)} created successfully.`);
    } catch (error) {
      console.error('Creation failed:', error);
    }
  }

  static async listDirectoryContent(filePath: string) {
    try {
      const files = await fs.readdir(filePath);
      const detailedFilesPromises = files.map(async (file: string) => {
        const fileDetails = await fs.lstat(path.resolve(filePath, file));
        const { size, birthtime } = fileDetails;
        // Convert bytes to megabytes
        const sizeInMB = (size / (1024 * 1024)).toFixed(2); // Limit to 2 decimal places
        return { filename: file, 'size (mb)': sizeInMB, created_at: birthtime };
      });
      const detailedFiles = await Promise.all(detailedFilesPromises);
      console.table(detailedFiles);
    } catch (error) {
      console.error('Error occurred while reading the directory:', error);
    }
  }
  
  static async deleteByName(filePath: string, recursive: boolean) {
    try {
      // Check if recursive deletion is disabled and the path is a directory
      if (!recursive) {
        const stats = await fs.lstat(filePath);
        if (stats.isDirectory()) {
          console.error(`Cannot delete '${path.basename(filePath)}': It's a directory.`);
          return;
        }
      }

      await fs.rm(filePath, { recursive: recursive });

      console.log(`Directory ${path.basename(filePath)} deleted successfully.`);
    } catch (error) {
      console.error('Deletion failed:', error);
    }
  }
}