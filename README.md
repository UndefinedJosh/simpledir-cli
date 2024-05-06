# SimpleDir CLI

SimpleDir is a command-line interface (CLI) tool for managing directories and files.
It provides simple commands to create, delete directories, create, and delete files, and list directory contents.

## Features

- List directory contents
- Create directories
- Delete directories
- Create files
- Delete files

## Installation

To use SimpleDir, you must have Node.js installed on your system. Once you have Node.js installed, you can install SimpleDir globally using npm:

```bash
npm install -g simpledir
```

## Usage

SimpleDir provides the following commands:

### List Directory Contents

```bash
simpledir -l <directory_path>
```

Use the `-l` or `--ls` option followed by the path of the directory to list its contents.

### Create a Directory

```bash
simpledir -m <directory_name>
```

Use the `-m` or `--mkdir` option followed by the name of the directory you want to create.

### Delete a Directory

```bash
simpledir -r <directory_path>
```

Use the `-r` or `--rmdir` option followed by the path of the directory you want to delete.

### Create a File

```bash
simpledir -t <file_name>
```

Use the `-t` or `--touch` option followed by the name of the file you want to create.

### Delete a File

```bash
simpledir -d <file_path>
```

Use the `-d` or `--delete` option followed by the path of the file you want to delete.

## Example

```bash
simpledir -m new_directory
```

This command will create a directory named `new_directory` in the current working directory.

## Contribution Guidelines

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Karxem/simpledir-cli/blob/main/LICENSE) file for details.
