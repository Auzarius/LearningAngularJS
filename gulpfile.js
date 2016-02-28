var gulp 		= require("gulp"),
	babel 		= require("gulp-babel"),
	concat  	= require("gulp-concat"),
	connect		= require("gulp-connect"),
	beautify	= require("gulp-cssbeautify"),
	cssnano		= require("gulp-cssnano"),
	jshint		= require("gulp-jshint"),
	ngAnnotate  = require("gulp-ng-annotate"),
	plumber		= require("gulp-plumber"),
	rename		= require("gulp-rename"),
	sass		= require("gulp-ruby-sass"),
	sourcemaps  = require("gulp-sourcemaps"),
 	uglify 		= require("gulp-uglify"),
	watch		= require("gulp-watch");
	
var livePort	= 1330;

gulp.task('connect', function() {
	connect.server({
		root: './',
		port: livePort,
		livereload: true,
		fallback: './views/index.html'
	});
});

gulp.task('annotate', function() {
	return gulp.src('./dev/ng/**/*.js')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(ngAnnotate())
		.pipe(concat('mf.js'))
		.pipe(gulp.dest('./dist/js/'))
		.pipe(uglify())
		.pipe(rename({ extname: ".min.js" }))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('./dist/js/'))
		.pipe(connect.reload());
});

gulp.task('sass', function() {
	return sass(['./dev/css/**/*.scss', './dev/css/**/*.sass'])
		.pipe(plumber())
		.pipe(gulp.dest('./dev/css'))
});

gulp.task('mini-css', function() {
	return gulp.src('./dev/css/**/*.css')
		.pipe(plumber())
		.pipe(beautify())
		.pipe(sourcemaps.init())
		.pipe(cssnano())
		.pipe(rename({extname: ".min.css"}))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('./dist/css'))
		.pipe(connect.reload());
});

gulp.task("babel", function () {
	return gulp.src('./dev/js/**/*.es6')
		.pipe(plumber())
		.pipe(babel())
		.pipe(jshint())
		.pipe(gulp.dest("./dev/js/"))
		.pipe(connect.reload());
});

gulp.task("js", function () {
	return gulp.src('./dev/js/**/*.js')
		.pipe(plumber())
		.pipe(jshint())
		.pipe(sourcemaps.init())
		.pipe(gulp.dest('./dist/js/'))
		.pipe(uglify())
		.pipe(rename({extname: ".min.js"}))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('./dist/js/'))
		.pipe(connect.reload());	
})

gulp.task("watch", function() {
	console.log("Gulp-Watch has begun watching ES6, ES5, Angular, CSS and SASS files.");
	gulp.watch('./dev/ng/**/*.js', ['annotate']);
	gulp.watch('./dev/css/**/*.scss', ['sass', 'mini-css']);
	gulp.watch('./dev/css/**/*.css', ['mini-css']);
	gulp.watch('./dev/js/**/*.es6', ['babel']);
	gulp.watch('./dev/js/**/*.js', ['js'])
});

gulp.task('default', ['connect', 'watch']);