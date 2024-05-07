import { FileManager } from './file-manager';
import fse from 'fs-extra';
import path from 'path';

describe('FileManager', () => {
  describe('createFile', () => {
    it('should create a file', async () => {
      const filePath = path.join(__dirname, 'test-file.txt');
      await FileManager.createFile(filePath, undefined);

      const isFile = await fse.stat(filePath).then((stats) => stats.isFile());
      expect(isFile).toBe(true);

      await fse.unlink(filePath);
    });

    it('should create a file with specified extension', async () => {
      const filePath = path.join(__dirname, 'test-file');
      await FileManager.createFile(filePath, 'js');

      const isFile = await fse.stat(`${filePath}.js`).then((stats) => stats.isFile());
      expect(isFile).toBe(true);

      await fse.unlink(`${filePath}.js`);
    });

    it('should handle errors for unknown extensions', async () => {
      const filePath = path.join(__dirname, 'test-file');
      const mockWriteFile = jest
        .spyOn(fse, 'writeFile');
      await expect(FileManager.createFile(filePath, 'hallo')).rejects.toThrow("Unknown extension: hallo");

      mockWriteFile.mockRestore();
    });

    it('should handle errors when creating a file', async () => {
      // Mock fs.writeFile to throw an error
      const mockWriteFile = jest
        .spyOn(fse, 'writeFile');

      // Expect FileManager.createFile to throw an error
      await expect(
        FileManager.createFile('/invalid/path', undefined)
      ).rejects.toThrow("ENOENT: no such file or directory, open 'C:\\invalid\\path'");

      mockWriteFile.mockRestore(); // Restore fs.writeFile to its original implementation
    });
  });
});
