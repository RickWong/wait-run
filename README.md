# wait-run

Wait for a file or directory to change then run a command. The watched file or directory does not have to exist yet.

Heavily based on the wonderful [watch-run](https://github.com/queckezz/watch-run/blob/master/bin/watch) by [@queckezz](https://twitter.com/queckezz).

## Installation

```bash
npm install -g wait-run
```

## Usage

```bash
wait-run --pattern '*.*' -- say hello
```

## License

BSD 3-Clause license. Copyright © 2016, Rick Wong. All rights reserved.
