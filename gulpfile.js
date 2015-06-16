var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var notify = require('gulp-notify');
var browserify = require('gulp-browserify');
var jade = require('gulp-jade');
var connect = require('gulp-connect');

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

var jsSrcDir = path.join(srcDir, 'js');
var jsDistDir = path.join(distDir, 'js');
var jsEntry = 'sketch.js';
var jsAll = '/**/*.js';

var imgSrc = path.join(srcDir, 'img');
var imgDist = path.join(distDir, 'img');
var imgAll = '/**/*'




gulp.task('tpl:dev', function() {
	return gulp.src(path.join(tplSrcDir, tplEntry))
		.pipe(jade({
			locals: {
				package: require('./package.json')
			}
		}))

		.on('error', notify.onError({
			message: 'You done fucked up now son: <%= error.message %>',
		}))

		.pipe(gulp.dest(distDir))
		.pipe(notify("This shit works as far as I can tell: <%= file.relative %>"))
		.pipe(connect.reload());
});

gulp.task('css:dev', function() {
	return gulp.src(path.join(cssSrcDir, cssEntry))

		.on('error', notify.onError({
			message: 'Broke. As. Fuck. : <%= error.message %>',
		}))

		.pipe(gulp.dest(cssDistDir))
		.pipe(notify("You did something right: <%= file.relative %>"))
		.pipe(connect.reload());
});

gulp.task('js:dev', function() {
	return gulp.src(path.join(jsSrcDir, jsAll))

		.on('error', notify.onError({
			message: "See, you play around too fuckin' much: <%= error.message %>",
		}))

		.pipe(gulp.dest(jsDistDir))
		.pipe(notify("Make it sqwuerk: <%= file.relative %>"))
		.pipe(connect.reload());
});

// gulp.task('assets:dev', function() {
// 	var images = gulp.src(imgSrc + imgAll)
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
	gulp.watch(cssSrcDir + cssAll, ['css:dev']);
	gulp.watch(jsSrcDir + jsAll, ['js:dev']);
});

gulp.task('serve', ['watch', 'connect']);
gulp.task('dev', ['tpl:dev', 'css:dev', 'js:dev']);
