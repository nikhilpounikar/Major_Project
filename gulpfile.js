const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
//const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
// const imagemin = require('gulp-imagemin');
//const del = require('del');

gulp.task('css', function(done) {
  console.log('minifying css...');
  
  // Process Sass files
   gulp.src('./assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'))
    //.pipe(rev())
    .pipe(gulp.dest('./public/assets/css'))
    // .pipe(rev.manifest({
    //   base: 'public',
    //   merge: true
    // }))
    //.pipe(gulp.dest('./public/assets'));

    done();
});




gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./assets/**/*.js')
    .pipe(uglify())
    //.pipe(rev())
    .pipe(gulp.dest('./public/assets/js'))
    // .pipe(rev.manifest({
    //     cwd: 'public',
    //     merge: true
    // }))
    //.pipe(gulp.dest('./public/assets'));
    done()
});


gulp.task('images', function(done){
    console.log('compressing images...');
   // gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    //.pipe(imagemin())
   // .pipe(rev())
    //.pipe(gulp.dest('./public/assets'))
    // .pipe(rev.manifest({
    //     cwd: 'public',
    //     merge: true
    // }))
    // .pipe(gulp.dest('./public/assets'));
    done();
});


// empty the public/assets directory
gulp.task('clean:assets', function(done){
    //del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});
