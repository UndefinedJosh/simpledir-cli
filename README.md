[![Unit Tests](https://github.com/Karxem/simpledir-cli/actions/workflows/unit_tests.yml/badge.svg?branch=main)](https://github.com/Karxem/simpledir-cli/actions/workflows/unit_tests.yml) [![Semantic Commits](https://github.com/Karxem/simpledir-cli/actions/workflows/semantic-commits.yml/badge.svg?branch=main)](https://github.com/Karxem/simpledir-cli/actions/workflows/semantic-commits.yml)
# Sid - SimpleDir CLI

<img src="https://cdn.discordapp.com/attachments/1078480166457725048/1237421760140415006/karxem_Ice_Age_Character_Animated_Style_An_animated_style_avata_ef3bb569-b545-4577-9f0c-5f8b0809213c.png?ex=663b9651&is=663a44d1&hm=478834d3b2a21008e8da42e7394fe0daef048d97598e0839fa0937e551341805&" alt="Sid Logo" width="100" height="100">

SimpleDir is a CLI tool for managing directories and files.

## Features

- List directory contents
- Create and delete directories and files with single commands
- Move directories and files

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

### Create a Directory or File

```bash
simpledir mk <name> [options] [extension]
```

Use the `mk` option followed by the name of the directory you want to create.

### Delete a Directory or File

```bash
simpledir rm <name> [options]
```

Use the `rm` option followed by the path of the directory you want to delete.

### Move a Directory or File

```bash
simpledir go <name> <target>
```

Use the `go` option followed by the paths of the directories you want to move.

## Example
Create a JavaScript file using sid:
```bash
simpledir m --file my_file js
```

This command will create a directory named `new_directory` in the current working directory.

## Contribution Guidelines

Contributions are welcome! <br>
Commits need to follow the [semantic commit](https://www.conventionalcommits.org/en/v1.0.0/) rules. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feat/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'feat: commit message`)
5. Push to the branch (`git push origin feat/your-feature`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Karxem/simpledir-cli/blob/main/LICENSE) file for details.
