const { src, dest, task, series, watch, parallel} = require("gulp")
const rm = require( 'gulp-rm' )
const sass = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const sassGlob = require('gulp-sass-glob')
const autoprefixer = require('gulp-autoprefixer')
const px2rem = require('gulp-smile-px2rem')
const gcmq = require('gulp-group-css-media-queries')
const cleanCSS = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite')
const gulpif = require('gulp-if')

const env = process.env.NODE_ENV

sass.compiler = require('node-sass')

task( 'clean', ()=> {
    console.log(env )
    return src( 'dist/**/*', { read: false }).pipe(rm());
});

task( "copy:html", ()=>{
    return src('src/*.html')
        .pipe(dest('dist'))
        .pipe(reload({stream: true}));
});

const image =[
    'src/image/**/*.png',
    'src/image/**/*.jpg'
]

task( "copy:img", ()=>{
    return src(image)
        .pipe(dest('dist/image'))
        .pipe(reload({stream: true}));
});

task( "copy:video", ()=>{
    return src('src/video/**/*.mp4')
        .pipe(dest('dist/video'))
        .pipe(reload({stream: true}));
});

const styles = [
    'node_modules/normalize.css/normalize.css',
    'src/style/main.scss'
]

task('icons', () => {
    return src('src/image/svg/*.svg')
        .pipe(svgo({
            plugins: [
                {
                    removeAttrs: {
                        attrs: '(fill|stroke|style|width|height|data.*)'
                    },
                    removeViewBox: false,
                    params: {
                        overrides: {
                            removeViewBox: false,
                        },
                    },
                }
            ]
        }))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest('dist'));
});

task('styles', ()=>{
    return src(styles)
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        //.pipe(px2rem())
        .pipe(gulpif(env === 'prod', autoprefixer({
            cascade: false
        })))
        //.pipe(gcmq())
        .pipe(gulpif(env === 'prod', cleanCSS()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest('dist'))
        .pipe(reload({ stream: true }))
})

task('scripts', ()=>{
    return src('src/script/*.js')
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.js', {newLine: ';'}))
        .pipe(gulpif(env === 'prod', babel({
            presets: ['@babel/env']
        })))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest('dist'))
        .pipe(reload({ stream: true }))
})

task('server', ()=>{
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        open: false
    })
})

task('watch', ()=>{
    watch('./src/style/**/*.scss', series('styles'))
    watch('./src/*.html', series('copy:html'))
    watch('./src/scripts/*.js', series('scripts'));
    watch('./src/images/icons/*.svg', series('icons'))
})

task('build',
    series('clean',
    parallel('copy:html', 'styles', 'scripts', 'copy:img', 'icons', 'copy:video')
    )
)

task ('default',
    series('clean',
    parallel('copy:html', 'styles', 'scripts', 'copy:img', 'icons', 'copy:video'),
    parallel('watch', 'server')
    )
);