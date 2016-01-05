#!/usr/bin/env node

/**
 * Module dependencies.
 */
var passthru = require('passthru');
var program = require('commander');
var join = require('path').join;
var Gaze = require('gaze').Gaze;
var delay = 0;

var list = function(val) {
	return val.split(',').map(function(val) {
		return val.trim()
	})
}

/**
 * Options.
 */
program
	.usage('<cmd>')
	.option('-p, --pattern <pattern>', 'glob pattern. "," separates multiple patterns.\n' +
		'                         More info: https://github.com/isaacs/minimatch', list, '**')
	.option('-i, --initial', 'run <cmd> on initial startup', false)
	.option('-d, --delay <n>', 'delay execution of <cmd> for a number of milliseconds', parseInt)

/**
 * Examples.
 */
program.on('--help', function() {
	console.log()
	console.log('  Examples:')
	console.log()
	console.log('    # watch dir and execute cmd')
	console.log('    $ wait-run -p \'lib/**\' cat package.json')
	console.log()
	console.log('    # watch dir "lib" and "src" and execute cmd')
	console.log('    $ wait-run -p \'lib/**,src/**\' cat package.json')
	console.log()
})

/**
 * Parse argv.
 */
program.parse(process.argv);

/**
 * Get command.
 */
var command = program.args.join(' ');
var run = false;

/**
 * Run initial execution if required.
 */
if (program.initial) {
	execute();
	run = false;
}

/**
 * Set requested delay after initial execution.
 */
delay = program.delay || 0;

/**
 * Watch.
 */
var watch = new Gaze(program.pattern);
watch.on('all', execute);
watch.on('nomatch', nomatch);

/**
 * Execute command when file in dir changes.
 *
 * @param {String} event
 * @param {String} path
 */
function execute(event, path) {
	if (run) {
		return;
	}

	run = true;

	setTimeout(function() {
		passthru(command, [], function (err) {
			if (event) {
				process.exit(err);
			}
		});
	}, delay);
}

/**
 * If the pattern couldn't be found, then keep globbing until a match is found.
 */
function nomatch() {
	watch.close();

	if (run) {
		return;
	}

	setTimeout(function () {
		watch = new Gaze(program.pattern);
		watch.on('all', execute);
		watch.on('nomatch', nomatch); // Recursion
		watch.on('ready', function(watcher) { 
			var keys = Object.keys(watcher._watched);
			if (keys && keys.length) {
				execute('added', watcher._watched[keys[0]]);
			}
		});
	}, delay || 500);
}
