var gulp = require('gulp'),
    del = require('del'),
    durandal = require('gulp-durandal'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    eventStream = require('event-stream'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    output = ".output",
    buildVersion = +new Date();


var $ = require('gulp-load-plugins')({
    lazy: true
});

function addBuildVersion() {
    return eventStream.map(function (file, callback) {
        var fileContent = String(file.contents);
        fileContent = fileContent
            .replace(/(\?|\&)v=([0-9]+)/gi, '') // remove build version
            .replace(/\.(jpeg|jpg|png|gif|css|js|html|eot|svg|ttf|woff)([?])/gi, '.$1?v=' + buildVersion + '&') // add build version to resource with existing query param
            .replace(/\.(jpeg|jpg|png|gif|css|js|html|eot|svg|ttf|woff)([\s\"\'\)])/gi, '.$1?v=' + buildVersion + '$2') // add build version to resource without query param
            .replace(/urlArgs: 'v=buildVersion'/gi, 'urlArgs: \'v=' + buildVersion + '\''); // replace build version for require config
        file.contents = new Buffer(fileContent);
        callback(null, file);
    });
};

function removeDebugBlocks() {
    return eventStream.map(function (file, callback) {
        var fileContent = String(file.contents);
        fileContent = fileContent
            .replace(/(\/\* DEBUG \*\/)([\s\S])*(\/\* END_DEBUG \*\/)/gmi, '') // remove all code between '/* DEBUG */' and '/* END_DEBUG */' comment tags
            .replace(/(\/\* RELEASE)|(END_RELEASE \*\/)/gmi, ''); // remove '/* RELEASE' and 'END_RELEASE */' tags to uncomment release code
        file.contents = new Buffer(fileContent);
        callback(null, file);
    });
};

gulp.task('build', ['clean', 'css', 'build-app', 'build-settings'], function () {});

gulp.task('clean', function (cb) {
    del([output], cb);
});

gulp.task('watch', function () {
    gulp.watch('./css/*.less', ['css']);
});

gulp.task('css', function () {
    gulp.src(['./css/styles.less'])
        .pipe($.plumber({
            errorHandler: function (error) {
                console.log(error);
                this.emit('end');
            }
        }))
        .pipe($.less({
            strictMath: true,
            strictUnits: true
        }))
        .pipe($.csso())
        .pipe($.autoprefixer({
            browsers: ['last 1 Chrome version', 'last 1 Firefox version', 'last 1 Explorer version', 'last 1 Safari version', 'last 1 iOS version'],
            cascade: false
        }))
        .pipe(gulp.dest('./css/'));
});

gulp.task('build-app', ['clean'], function () {
    var assets = useref.assets();

    gulp.src('index.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(addBuildVersion())
        .pipe(gulp.dest(output));

    gulp.src(['settings.js', 'publishSettings.js'])
        .pipe(gulp.dest(output));

    gulp.src('css/font/**')
        .pipe(gulp.dest(output + '/css/font'));

    gulp.src('images/**')
        .pipe(gulp.dest(output + '/images'));

    gulp.src(['js/require/require.js'])
        .pipe(gulp.dest(output + '/js/require'));

    gulp.src('lang/*.json')
        .pipe(gulp.dest(output + '/lang'));

    gulp.src('manifest.json')
        .pipe(gulp.dest(output));

    return durandal({
            minify: true
        })
        .pipe(addBuildVersion())
        .pipe(gulp.dest(output + '/app'));
});

gulp.task('build-settings', ['build-design-settings', 'build-configure-settings'], function () {
    gulp.src('settings/api.js')
        .pipe(removeDebugBlocks())
        .pipe(uglify())
        .pipe(gulp.dest(output + '/settings'));

});

gulp.task('build-design-settings', ['clean'], function () {
    var assets = useref.assets();

    gulp.src(['settings/design/design.html'])
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(addBuildVersion())
        .pipe(gulp.dest(output + '/settings/design'));

    gulp.src('settings/design/css/fonts/**')
      .pipe(gulp.dest(output + '/settings/design/css/fonts'));
    
    gulp.src('settings/design/css/design.css')
      .pipe(minifyCss())
      .pipe(gulp.dest(output + '/settings/design/css'));

});

gulp.task('build-configure-settings', ['clean'], function () {
    var assets = useref.assets();

    gulp.src(['settings/configure/configure.html'])
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(addBuildVersion())
        .pipe(gulp.dest(output + '/settings/configure'));

    gulp.src('settings/configure/img/**')
      .pipe(gulp.dest(output + '/settings/configure/img'));
    
    gulp.src('settings/configure/css/img/**')
      .pipe(gulp.dest(output + '/settings/configure/css/img'));
    
    gulp.src('settings/configure/css/fonts/**')
      .pipe(gulp.dest(output + '/settings/configure/css/fonts'));
    
    gulp.src('settings/configure/css/configure.css')
      .pipe(minifyCss())
      .pipe(gulp.dest(output + '/settings/configure/css'));

});

gulp.task('webserver', function () {
    gulp.src('.')
        .pipe($.webserver({
            livereload: {
                enable: true,
                filter: function (fileName) {
                    return !fileName.match(/.less$/);
                }
            },
            directoryListing: true,
            open: "index.html"
        }));
});