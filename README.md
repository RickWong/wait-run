# wait-run

[![version](https://img.shields.io/npm/v/wait-run.svg)](https://npmjs.org/package/wait-run) ![license](https://img.shields.io/npm/l/wait-run.svg) ![installs](https://img.shields.io/npm/dt/wait-run.svg)

Wait for a file or directory to change or appear, then run a command once. The watched file or directory does not have to exist yet.

Heavily based on the wonderful [watch-run](https://github.com/queckezz/watch-run) by [@queckezz](https://twitter.com/queckezz).

Simply need to wait for a file/directory? Use [just-wait](https://github.com/download/just-wait) by [@Download](https://twitter.com/stijndewitt) which is a fork of wait-run. It allows you to chain `&&` commands.

## Installation

```bash
npm install -g wait-run
```

## Usage

```bash
wait-run --pattern '*.*' -- say hello    # waits for any change in cwd then runs once.
```

## License

BSD 3-Clause license. Copyright © 2016, Rick Wong. All rights reserved.
