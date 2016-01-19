// Import libs
var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var notify = require('gulp-notify');
var browserify = require('gulp-browserify');
var jade = require('gulp-jade');
var less = require('gulp-less-sourcemap');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');

var server = require('gulp-express');
// Libs imported


// Declare vars
var srcDir = 'src';
var distDir = 'dist';

var tplSrcDir = path.join(srcDir, 'tpl');
var tplDistDir = distDir;
var tplEntry = '*.jade';
var tplAll = '/**/*.jade';

var cssSrcDir = path.join(srcDir, 'css');
var cssDistDir = path.join(distDir, 'css');
var cssEntry = 'frame.css';
var cssAll = '/**/*.css';

var lessSrcDir = path.join(srcDir, 'less');
var lessDistDir = path.join(distDir, 'css');
var lessEntry = 'frame.less';
var lessAll = '/**/*.less';

var sassSrcDir = path.join(srcDir, 'sass');
var sassDistDir = path.join(distDir, 'css');
var sassEntry = 'main.scss';
var sassAll = '/**/*.scss';

var jsSrcDir = path.join(srcDir, 'js');
var jsDistDir = path.join(distDir, 'js');
var jsEntry = 'sketch.js';
var jsAll = '**/*.js';

var imgSrc = path.join(srcDir, 'img');
var imgDist = path.join(distDir, 'img');
var imgAll = '/**/*'
// Vars declared


// Define functions
gulp.task('tpl:dev', function() {
	return gulp.src(path.join(tplSrcDir, tplEntry))
		.pipe(jade({
			locals: {
				package: require('./package.json')
			}
		}))

		.on('error', notify.onError({
			message: 'You done messed up now: <%= error.message %>',
		}))

		.pipe(gulp.dest(distDir))
		.pipe(notify("Your jade skills are on point as far as I can tell: <%= file.relative %>"))
		.pipe(connect.reload());
});

gulp.task('css:dev', function() {
	return gulp.src(path.join(cssSrcDir, cssEntry))

		.on('error', notify.onError({
			message: 'You probably dropped a semi-colon in your stylesheet: <%= error.message %>',
		}))

		.pipe(gulp.dest(cssDistDir))
		.pipe(notify("Your css changes have taking effect: <%= file.relative %>"))
		.pipe(connect.reload());
});

gulp.task('less:dev', function() {
	return gulp.src(path.join(lessSrcDir, lessEntry))
		.pipe(less())

		.on('error', notify.onError({
			message: 'You probably dropped a semi-colon in your stylesheet: <%= error.message %>',
		}))

		.pipe(gulp.dest(lessDistDir))
		.pipe(notify("Your LESS changes have taking effect: <%= file.relative %>"))
		.pipe(connect.reload());
});

gulp.task('sass:dev', function() {
	return gulp.src(path.join(sassSrcDir, sassEntry))
		.pipe(sass())

		.on('error', notify.onError({
			message: 'You probably dropped a semi-colon in your stylesheet: <%= error.message %>',
		}))

		.pipe(gulp.dest(cssDistDir))
		.pipe(notify("Your SASS changes have taking effect: <%= file.relative %>"))
		.pipe(connect.reload());
});

gulp.task('js:dev', function(fname) {
	return gulp.src(path.join(jsSrcDir, fname))

		.on('error', notify.onError({
			message: "See, you play around too much: <%= error.message %>",
		}))

		.pipe(gulp.dest(jsDistDir))
		.pipe(notify("Your JS changes have taken effect: <%= file.relative %>"))
		.pipe(connect.reload());
});

gulp.task('css:prod', function() {
	return gulp.src(path.join(cssSrcDir, cssEntry))
		.pipe(minify())

		.on('error', notify.onError({
			message: 'You probably dropped a semi-colon in your stylesheet: <%= error.message %>',
		}))

		.pipe(gulp.dest(cssDistDir))
		.pipe(notify("You did something right: <%= file.relative %>"))
		.pipe(connect.reload());
});

gulp.task('less:prod', function() {
	return gulp.src(path.join(lessSrcDir, lessEntry))
		.pipe(less())
		.pipe(minify())

		.on('error', notify.onError({
			message: 'You probably dropped a semi-colon in your stylesheet: <%= error.message %>',
		}))

		.pipe(gulp.dest(cssDistDir))
		.pipe(notify("You did something right: <%= file.relative %>"))
		.pipe(connect.reload());
});

gulp.task('sass:prod', function() {
	return gulp.src(path.join(sassSrcDir, sassEntry))
		.pipe(sass())
		.pipe(minify())

		.on('error', notify.onError({
			message: 'You probably dropped a semi-colon in your stylesheet: <%= error.message %>',
		}))

		.pipe(gulp.dest(cssDistDir))
		.pipe(notify("You did something right: <%= file.relative %>"))
		.pipe(connect.reload());
});

gulp.task('js:prod', function() {
	return gulp.src(path.join(jsSrcDir, jsAll))

		.on('error', notify.onError({
			message: "Your JS isn't compiling right: <%= error.message %>",
		}))

		.pipe(gulp.dest(jsDistDir))
		.pipe(notify("As development, so production: <%= file.relative %>"))
		.pipe(connect.reload());
});


// gulp.task('assets:dev', function() {
// 	return gulp.src(imgSrc + imgAll)
// 		.pipe(gulp.dest(imgDist));

// 	return images;
// });

gulp.task('connect', function() {
	connect.server({
		root: distDir,
		livereload: true,
		port: 31073
	})
});

gulp.task('watch', ['dev'], function() {
	gulp.watch(tplSrcDir + tplAll, ['tpl:dev']);
	// gulp.watch(cssSrcDir + cssAll, ['css:dev']);
	gulp.watch(sassSrcDir + sassAll, ['sass:dev']);
	gulp.watch(jsSrcDir + jsAll, ['js:dev']);
});
// Functions are defined


// Run that ish.
gulp.task('serve', ['watch', 'connect']);
gulp.task('dev', ['tpl:dev', 'sass:dev', 'js:dev']);
gulp.task('prod', ['tpl:prod', 'sass:prod', 'js:prod']);
// Ish is ran.
