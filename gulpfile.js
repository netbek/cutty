const _ = require('lodash');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const fs = require('fs-extra');
const gulp = require('gulp');
const livereload = require('livereload');
const log = require('fancy-log');
const nunjucks = require('nunjucks');
const open = require('open');
const os = require('os');
const path = require('path');
const Promise = require('bluebird');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('node-sass'));
const svgmin = require('gulp-svgmin');
const webpack = require('webpack');
const webserver = require('gulp-webserver');

Promise.promisifyAll(fs);

const gulpConfig = require('./gulp.config');
const webpackConfig = require('./webpack.config');

const livereloadOpen =
  (gulpConfig.webserver.https ? 'https' : 'http') +
  '://' +
  gulpConfig.webserver.host +
  ':' +
  gulpConfig.webserver.port +
  (gulpConfig.webserver.open ? gulpConfig.webserver.open : '/');

const flags = {
  livereloadInit: false // Whether `livereload-init` task has been run
};
let server;

// Choose browser for node-open
let browser = gulpConfig.webserver.browsers.default;
const platform = os.platform();
if (_.has(gulpConfig.webserver.browsers, platform)) {
  browser = gulpConfig.webserver.browsers[platform];
}

/**
 *
 * @param   {string} src
 * @param   {string} dist
 * @returns {Stream}
 */
function buildCss(src, dist) {
  return gulp
    .src(src)
    .pipe(sass(gulpConfig.css.params).on('error', sass.logError))
    .pipe(autoprefixer(gulpConfig.autoprefixer))
    .pipe(gulp.dest(dist))
    .pipe(
      cssmin({
        advanced: false
      })
    )
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest(dist));
}

/**
 *
 * @param   {string} src
 * @param   {string} dist
 * @returns {Stream}
 */
function buildImg(src, dist) {
  return gulp.src(src).pipe(gulp.dest(dist));
}

function buildJs(config) {
  return new Promise((resolve, reject) => {
    webpack(config, function (err, stats) {
      if (err) {
        log('[webpack]', err);
        reject();
      } else {
        log(
          '[webpack]',
          stats.toString({
            cached: false,
            cachedAssets: false,
            children: true,
            chunks: false,
            chunkModules: false,
            chunkOrigins: true,
            colors: true,
            entrypoints: false,
            errorDetails: false,
            hash: false,
            modules: false,
            performance: true,
            reasons: true,
            source: false,
            timings: true,
            version: true,
            warnings: true
          })
        );
        resolve();
      }
    });
  });
}

/**
 *
 * @param   {string} src
 * @param   {string} dist
 * @returns {Stream}
 */
function buildSvg(src, dist) {
  return gulp
    .src(src)
    .pipe(
      svgmin({
        js2svg: {
          pretty: true
        }
        // plugins: [{
        //   cleanupIDs: {
        //     remove: false
        //   }
        // }]
      })
    )
    .pipe(gulp.dest(dist));
}

/**
 * Start a watcher.
 *
 * @param {Array}   files
 * @param {Array}   tasks
 * @param {boolean} live - Set to TRUE to force livereload to refresh the page.
 */
function startWatch(files, tasks, live = false) {
  if (live) {
    tasks.push('livereload-reload');
  }
  gulp.watch(files, gulp.series(...tasks));
}

// Start webserver
gulp.task('webserver-init', (cb) => {
  gulp
    .src('./')
    .pipe(webserver({...gulpConfig.webserver, open: false}))
    .on('end', cb);
});

// Start livereload server
gulp.task('livereload-init', async (cb) => {
  if (!flags.livereloadInit) {
    flags.livereloadInit = true;
    server = livereload.createServer();
    await open(livereloadOpen, {app: browser});
  }
  cb();
});

// Refresh page
gulp.task('livereload-reload', (cb) => {
  server.refresh(livereloadOpen);
  cb();
});

gulp.task('clean', () =>
  Promise.mapSeries(['css', 'js', 'svg', 'demo'], (dir) => fs.removeAsync(dir))
);

gulp.task('build-css', (cb) => {
  buildCss('src/css/**/*.scss', 'css/').on('end', cb);
});

gulp.task('build-img', (cb) => {
  buildImg('src/img/**/*', 'img/').on('end', cb);
});

gulp.task('build-js', () =>
  buildJs({
    ...webpackConfig,
    entry: {
      cutty: path.resolve('src/js/cutty.js'),
      'cutty.min': path.resolve('src/js/cutty.js')
    },
    output: {
      filename: '[name].js',
      path: path.resolve('js')
    }
  })
);

gulp.task('build-svg', (cb) => {
  buildSvg('src/svg/**/*.svg', 'svg/').on('end', cb);
});

gulp.task('build-demo', () =>
  fs
    .readFileAsync('src/index.njk', 'utf-8')
    .then((data) => nunjucks.renderString(data, {}))
    .then((data) => fs.outputFileAsync('demo/index.html', data, 'utf-8'))
);

gulp.task(
  'build',
  gulp.series(
    'clean',
    'build-css',
    'build-img',
    'build-js',
    'build-svg',
    'build-demo'
  )
);

// Watch with livereload that doesn't rebuild docs
gulp.task('watch:livereload', () => {
  gulpConfig.watchTasks.forEach((config) =>
    startWatch(config.files, [].concat(config.tasks, ['livereload-reload']))
  );
});

gulp.task(
  'livereload',
  gulp.series('build', 'webserver-init', 'livereload-init', 'watch:livereload')
);

exports.default = gulp.series('build');
