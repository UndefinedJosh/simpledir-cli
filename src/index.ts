#!/usr/bin/env node

const { Command } = require('commander');
import { DirectoryManager } from './DirectoryManager';
import { FileManager } from './FileManager';

const path = require('path');
const figlet = require('figlet');

const program = new Command();

program
  .description('A CLI tool for managing directories')
  .version('1.0.0', '-v, --version', 'show cli version')
  .helpOption('-h, --help', 'display help for options')
  .option('-l, --ls [directory_path]', 'list directory contents')
  .option('-m, --mkdir <directory_name>', 'create a directory')
  .option('-r, --rmdir <directory_path>', 'delete a directory')
  .option('-t, --touch <file_name>', 'create a file')
  .option('-d, --delete <file_name>', 'delete a file')
  .option('-nr, --no-recursive', 'disable recursive deletion');
  
program.parse(process.argv);

const options = program.opts();
const processPath = process.cwd();

switch (true) {
  case Boolean(options.ls):
    const lsPath = typeof options.ls === 'string' ? options.ls : processPath;
    DirectoryManager.listDirectoryContent(lsPath);
    break;
  case Boolean(options.mkdir):
    DirectoryManager.createDirectory(path.resolve(processPath, options.mkdir));
    break;
  case Boolean(options.rmdir):
    const recursive = options.recursive !== false; // Convert undefined to true
    console.info('Recursive deletion:', recursive);
    DirectoryManager.deleteDirectory(path.resolve(processPath, options.rmdir), recursive);
    break;
  case Boolean(options.touch):
    FileManager.createFile(path.resolve(processPath, options.touch));
    break;
  default:
    console.log(figlet.textSync('simpleDir'));
    program.outputHelp();
    break;
}