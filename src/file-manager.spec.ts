import { FileManager } from './file-manager';
import fs from 'fs/promises';
import path from 'path';

describe('FileManager', () => {
  describe('createFile', () => {
    it('should create a file', async () => {
      const filePath = path.join(__dirname, 'test-file.txt');
      await FileManager.createFile(filePath, undefined);

      const isFile = await fs.stat(filePath).then((stats) => stats.isFile());
      expect(isFile).toBe(true);

      await fs.unlink(filePath);
    });

    it('should create a file with specified extension', async () => {
      const filePath = path.join(__dirname, 'test-file');
      await FileManager.createFile(filePath, 'js');

      const isFile = await fs.stat(`${filePath}.js`).then((stats) => stats.isFile());
      expect(isFile).toBe(true);

      await fs.unlink(`${filePath}.js`);
    });

    it('should handle errors when creating a file', async () => {
      // Mock fs.writeFile to throw an error
      const mockWriteFile = jest
        .spyOn(fs, 'writeFile')
        .mockRejectedValue(new Error('Mocked error'));

      // Expect FileManager.createFile to throw an error
      await expect(
        FileManager.createFile('/invalid/path', undefined)
      ).rejects.toThrow('Mocked error');

      mockWriteFile.mockRestore(); // Restore fs.writeFile to its original implementation
    });
  });
});
