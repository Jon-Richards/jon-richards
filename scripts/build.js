#!/usr/bin/env node

const Path = require('path');
const Cmd = require('commander');
const Watcher = require('watch');
const Dir = require('node-dir');

const Echo = require('./utils/echo.js');
const Config = require('./../compiler-config.js');
const Css = require('./compilers/css_compiler');
const Js = require('./compilers/js_compiler');

/**
 * Parameters used for deciding which assets to build
 * and if source files should be watched for further
 * changes.
 */
Cmd
  .option('-j, --javascript', 'Build Javascript')
  .option('-c, --css', 'Build CSS')
  .option('-w <directory>, --watch <directory>', 'Watch')
  .parse(process.argv);

/**
 * Initializes Watcher and begins watching
 * a given directory for changes.
 * 
 * @param path {path} Path of the directory to watch.
 */
function watch (dir) {
  Watcher.createMonitor(dir, (monitor) => {
    monitor.on('changed', (file, current, previous) => {
      Echo('Detected change on: ' + file, 'green');
      build();
    });
    monitor.on('created', (file, status) => {
      Echo('New file created: ' + file, 'green');
      build();
    });
    monitor.on('removed', (file, status) => {
      Echo(file + ' removed...', 'green');
      build();
    });
    Echo('Watching ' + dir + ' for changes...', 'green');
  });
}

/**
 * Initiates Javascript compilation based on
 * the input/output entries in compiler-config.js.
 */
function build_js() {
  for (var i = 0; i < Config.js.length; i++) {
    let _conf = Config.js[i];
    Js.build(_conf.input, _conf.output, _conf.sourcemap);
  }
}

/**
 * Initiates a SASS compilation based on
 * the input/output entries in compiler-config.js.
 */
function build_css() {
  for (var i = 0; i < Config.css.length; i++) {
    let _conf = Config.css[i];
    Css.build(_conf.input, _conf.output, _conf.sourcemap);
  }
}

/**
 * Builds assets depending on which parameters
 * were passed to this script.  If no options
 * are passed, build everything.
 */
function build() {
  let opts = [];
  if (Cmd.javascript) opts.push(build_js);
  if (Cmd.css) opts.push(build_css);

  if (opts.length > 0) {
    for (var i = 0; i < opts.length; i++) {
      opts[i]();
    }
  } else {
    build_js();
    build_css();
  }
}

/**
 * Initializes this script.  If the watch option
 * was passed, begins watching the appropriate
 * directories for changes.
 */
function init() {
  build();
  if (Cmd.watch) watch(Cmd.watch);
}
init();