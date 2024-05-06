#!/usr/bin/env node

const { Command } = require('commander');
import { DirectoryManager } from './DirectoryManager';
import { FileManager } from './FileManager';

const path = require('path');
const figlet = require('figlet');

const program = new Command();

program.name('simpledir')
  .description('A CLI tool for managing directories')
  .version('1.0.0', '-v, --version', 'output cli version')
  .usage('<command> | [option]')
  .helpOption('-h, --help', 'display help overview')
  .option('-l, --ls [directory_path]', 'list directory contents')
  .action((options: any) => {
    if (!options.ls) {
      program.outputHelp();
      return;
    }

    const lsPath = typeof options.ls === 'string' ? options.ls : process.cwd();
    DirectoryManager.listDirectoryContent(lsPath);
  })

program.showHelpAfterError('use --help for additional information');

program.command('rm')
  .alias('r')
  .usage("<name> [options]")
  .description('delete the selected file or directory')
  .summary("delete dir or file")
  .argument('<name>', 'file or directory name')
  .option('--no-recursive', 'disable recursion')
  .action((name: string, options: any) => {
    const recursive = options.recursive !== false;
    DirectoryManager.deleteByName(path.resolve(process.cwd(), name), recursive);
  });


program.addHelpText('before', `${figlet.textSync('simpleDir')}`);

program.parse(process.argv);