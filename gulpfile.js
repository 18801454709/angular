var gulp = require("gulp"),
//检测、运行本地web服务器
	webserver = require("gulp-webserver");

 	url=require('url'),
	route=require('./data/main.js'),

	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector'),

	gulp.task('rev',function(){
		return gulp.src(['src/js/index.js'])
			.pipe(rev())
			.pipe(gulp.dest('bulib/'))
			.pipe(rev.manifest())
			.pipe(gulp.dest('./'))
	})

gulp.task('revCollector',function(){
	return gulp.src(['rev-manifest.json'])
		.pipe(revCollector({
			replaceReved:true,
			dirReplacements:{
				'css':'bulib',
				'js':'bulib'
			}
		}))
		.pipe(gulp.dest('./'))
})

gulp.task("serve", function () {
    gulp.src('./src')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: "html/table.html"
        }));
});

gulp.task("default",["serve",'rev','revCollector']);