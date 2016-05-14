var gulp = require('gulp'),
    surge = require('gulp-surge'),
    concat = require('gulp-concat-util'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    cleanCSS = require('gulp-clean-css'),
    concatCss = require('gulp-concat-css');

gulp.task('deploy', [], function () {
    return surge({
        project: './',         // Path to your static build directory
        domain: 'vipada.srisawat.me'  // Your domain or Surge subdomain
    })
});

gulp.task('js-concat', function() {
    gulp.src(['js/gmaps.js', 'assets/owl-carousel/owl.carousel.min.js', 'js/waypoints.js', 'js/jquery.fittext.js', 'js/wow.min.js', 'js/jquery.nicescroll.min.js', 'js/script.js'])
        .pipe(concat('dist.js'))
        .pipe(concat.header('// file: <%= file.path %>\n'))
        .pipe(concat.footer('\n// end\n'))
        .pipe(gulp.dest('js'));
});

gulp.task('js-minify', function() {
    return gulp.src('js/dist.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('js'));
});

gulp.task('css-concat', function () {
    return gulp.src(['css/default.css', 'css/style.css', 'css/responsive.css', 'css/animate.css', 'assets/owl-carousel/owl.carousel.css', 'assets/owl-carousel/owl.theme.css'])
        .pipe(concatCss('dist.css'))
        .pipe(gulp.dest('css'));
});

gulp.task('css-minify', function() {
    return gulp.src('css/dist.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('js', ['js-concat', 'js-minify']);
gulp.task('css', ['css-concat', 'css-minify']);
gulp.task('build', ['js', 'css']);
