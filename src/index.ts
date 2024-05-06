#! /usr/bin/env node

const { Command } = require('commander');
const fs = require('fs').promises; // Using promises version
const path = require('path');
const figlet = require('figlet');

const program = new Command();
console.log(figlet.textSync('SimpleDir'));

program
  .version('1.0.0', '-v, --version', 'Show cli version')
  .description('A CLI for managing directories')
  .option('-l, --ls [value]', 'List directory contents')
  .option('-m, --mkdir <name>', 'Create a directory')
  .option('-r, --rmdir <filepath>', 'Delete a directory')
  .option('-t, --touch <name>', 'Create a file')
  .option('-d, --delete <filepath>', 'Delete a file');

program.parse(process.argv);

const options = program.opts();

async function createDirectory(filePath: string) {
  try {
    await fs.mkdir(filePath);
    const directoryName = filePath.split('/');
    console.log(`Directory ${directoryName[directoryName.length - 1]} created successfully.`);
  } catch (error) {
    console.error('Creation failed:', error);
  }
}

async function deleteDirectory(filePath: string) {
  try {
    await fs.rmdir(filePath, { recursive: true });

    const directoryName = filePath.split('/');
    console.log(`Directory ${directoryName[directoryName.length - 1]} deleted successfully.`);
  } catch (error) {
    console.error('Deletion failed:', error);
  }
}

async function createFile(filePath: string) {
  try {
    await fs.writeFile(filePath, '');

    const fileName = filePath.split('/');
    console.log(`File ${fileName[fileName.length - 1]} created successfully.`);
  } catch (error) {
    console.error('File creation failed:', error);
  }
}

async function deleteFile(filePath: string) {
  try {
    await fs.unlink(filePath);

    const fileName = filePath.split('/');
    console.log(`File ${fileName[fileName.length - 1]} deleted successfully.`);
  } catch (error) {
    console.error('File deletion failed:', error);
  }
}

async function listDirectoryContent(filePath: string) {
  try {
    const files = await fs.readdir(filePath);
    const detailedFilesPromises = files.map(async (file: string) => {
      let fileDetails = await fs.lstat(path.resolve(filePath, file));
      const { size, birthtime } = fileDetails;
      return { filename: file, 'Size [kb]': size, created_at: birthtime };
    });

    const detailedFiles = await Promise.all(detailedFilesPromises);
    console.table(detailedFiles);
  } catch (error) {
    console.error('Error occurred while reading the directory:', error);
  }
}

switch (true) {
  case Boolean(options.ls):
    const lsPath = typeof options.ls === 'string' ? options.ls : __dirname;
    listDirectoryContent(lsPath);
    break;
  case Boolean(options.mkdir):
    createDirectory(path.resolve(__dirname, options.mkdir));
    break;
  case Boolean(options.rmdir):
    deleteDirectory(path.resolve(__dirname, options.rmdir));
    break;
  case Boolean(options.touch):
    createFile(path.resolve(__dirname, options.touch));
    break;
  case Boolean(options.delete):
    deleteFile(path.resolve(__dirname, options.delete));
    break;
  default:
    program.outputHelp();
    break;
}
