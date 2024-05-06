# Sid - SimpleDir CLI

<img src="https://cdn.discordapp.com/attachments/1078480166457725048/1237124742696402944/karxem_a_logo_on_white_background_sid_from_ice_age_2d936c3c-3b46-4a47-b7b7-e4b48e33bc2c.png?ex=663a81b3&is=66393033&hm=49eb2588a9e360b490e30b19767eb7677ddcab5edfd679faaa6b788d581a0acb&" alt="Sid Logo" width="100" height="100">

SimpleDir is a CLI tool for managing directories and files. <br>
It provides simple commands to handle directories and files.

## Features

- List directory contents
- Create and delete directories
- Create and delete files

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

## Example

```bash
simpledir -m new_directory
```

This command will create a directory named `new_directory` in the current working directory.

## Contribution Guidelines

Contributions are welcome! <br>
Commits need to follow the [semantic commit](https://www.conventionalcommits.org/en/v1.0.0/) rules. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'commit message`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Karxem/simpledir-cli/blob/main/LICENSE) file for details.
