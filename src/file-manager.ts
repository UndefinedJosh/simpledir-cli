const fs = require('fs').promises;
const path = require('path');

export class FileManager {
  static async createFile(filePath: string, extension: string | undefined) {
    let fileContent = '';
    try {
      if (extension) {
        // List of recognized extensions
        const recognizedExtensions = [
          'js',
          'txt',
          'json',
          'html',
          'css',
          'md',
          'yml',
          'xml',
          'csv',
        ];

        if (!recognizedExtensions.includes(extension)) {
          throw new Error(`Unknown extension: ${extension}`);
        }

        // Set file content with a comment indicating the file's name
        fileContent = `// ${path.basename(filePath)} file`;
        filePath = `${filePath}.${extension}`; // Adjust filePath to include the extension
      }

      await fs.writeFile(filePath, fileContent);
      if (extension) {
        console.log(
          `File ${path.basename(
            filePath
          )} with extension ${extension} created successfully.`
        );
      } else {
        console.log(`File ${path.basename(filePath)} created successfully.`);
      }
    } catch (error) {
      throw error; // Throw the error to propagate it to the caller
    }
  }
}

