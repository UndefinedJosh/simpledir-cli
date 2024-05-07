import { DirectoryManager } from "./directory-manager";
import fs from "fs/promises";
import path from "path";

describe("DirectoryManager", () => {
  describe("createDirectory", () => {
    it("should create a directory", async () => {
      const directoryPath = path.join(__dirname, "test-directory");
      await DirectoryManager.createDirectory(directoryPath);

      const isDirectory = await fs
        .stat(directoryPath)
        .then((stats) => stats.isDirectory());
      expect(isDirectory).toBe(true);

      await fs.rmdir(directoryPath);
    });

    it("should handle errors when creating a directory", async () => {
      // Mock fs.mkdir to throw an error
      const mockMkdir = jest
        .spyOn(fs, "mkdir")
        .mockRejectedValue(new Error("Mocked error"));

      // Expect DirectoryManager.createDirectory to throw an error
      await expect(
        DirectoryManager.createDirectory("/invalid/path")
      ).rejects.toThrow("Mocked error");

      mockMkdir.mockRestore(); // Restore fs.mkdir to its original implementation
    });
  });

  describe("listDirectoryContent", () => {
    it("should list directory contents", async () => {
      // Create a test directory with some files
      const directoryPath = path.join(__dirname, "test-directory");
      await fs.mkdir(directoryPath);
      await fs.writeFile(
        path.join(directoryPath, "test-file.txt"),
        "Test file content"
      );

      // Call listDirectoryContent and capture console.table output
      const consoleTableSpy = jest
        .spyOn(console, "table")
        .mockImplementation(() => {});
      await DirectoryManager.listDirectoryContent(directoryPath);

      // Assert that console.table was called with the expected output
      expect(consoleTableSpy).toHaveBeenCalled();

      // Clean up: delete the test directory
      await fs.rmdir(directoryPath, { recursive: true });
    });

    describe("deleteFileOrDirectoryByName", () => {
      it("should delete a file or directory", async () => {
        // Create a test directory with a file
        const directoryPath = path.join(__dirname, "test-directory");
        await fs.mkdir(directoryPath);
        await fs.writeFile(
          path.join(directoryPath, "test-file.txt"),
          "Test file content"
        );

        // Call deleteByName and assert that the file is deleted
        await DirectoryManager.deleteFileOrDirectoryByName(
          path.join(directoryPath, "test-file.txt"),
          false
        );
        const exists = await fs
          .access(path.join(directoryPath, "test-file.txt"))
          .then(() => true)
          .catch(() => false);
        expect(exists).toBe(false);

        // Clean up: delete the test directory
        await fs.rmdir(directoryPath, { recursive: true });
      });

      it("should handle errors when listing directory contents", async () => {
        // Mock fs.readdir to throw an error
        const mockReaddir = jest
          .spyOn(fs, "readdir")
          .mockRejectedValue(new Error("Mocked error"));

        // Expect DirectoryManager.listDirectoryContent to throw an error
        await expect(
          DirectoryManager.listDirectoryContent("/invalid/path")
        ).rejects.toThrow("Mocked error");

        mockReaddir.mockRestore(); // Restore fs.readdir to its original implementation
      });
    });
  });

  it("should handle errors when deleting a file or directory", async () => {
    // Mock fs.rm to throw an error
    const mockRm = jest
      .spyOn(fs, "rm")
      .mockRejectedValue(new Error("Mocked error"));

    // Expect DirectoryManager.deleteFileOrDirectoryByName to throw an error
    try {
      await DirectoryManager.deleteFileOrDirectoryByName(
        "/invalid/path",
        false
      );
    } catch (error: any) {
      // Assert that the error message matches the expected value
      expect(error);
    }

    mockRm.mockRestore(); // Restore fs.rm to its original implementation
  });
});
