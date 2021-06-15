const {gulp, src, dest, lastRun, series, parallel, watch} = require('gulp');
const plumber = require('gulp-plumber');
const cssnano = require('cssnano');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const fileInclude = require('gulp-file-include');
const removeEmptyLines = require('gulp-remove-empty-lines');
const htmlReplace = require('gulp-html-replace');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');
const browserSync = require('browser-sync').create();
const del = require('del');
const order = require("gulp-order");
const changed = require('gulp-changed');
const using = require('gulp-using');
const beautify = require('gulp-beautify');
const cssBeautify = require('gulp-cssbeautify');
const gulpRemoveHtml = require('gulp-remove-html');
const clean = require('gulp-clean');
const zip = require('gulp-zip');
const hash_src = require('gulp-hash-src');

const source = {
    path : 'sources/__path/**/*.*',
    html : 'sources/html/**/*.html',
    css : 'sources/static/scss/',
    js : 'sources/static/js/',
    img : 'sources/static/images/',
    ir : 'sources/static/ir/',
    guide : 'sources/html/__guide/resources/',
    commonResource : 'sources/static/common/'    
}

const dist = {
    path: 'dist/__path/',
    html: 'dist/',
    css : 'dist/static/css/',
    js : 'dist/static/js/',
    img : 'dist/static/images/',
    guide : 'dist/html/__guide/resources/',
    commonResource : 'dist/static/common/'    
}


// const removeHTML = () => {
//     return (
//         src('dist/html/mobile/**/*.html')
//         .pipe(gulpRemoveHtml())
//         .pipe(dest('dist/html/mobile/'))
//     )
// }

// html include
const htmlTask = () => {
    return (
        src(source.html, {base: 'sources/'}, {since: lastRun(htmlTask)})
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file',
        }))
        //.pipe(gulpRemoveHtml())
        .pipe(beautify.html(
            { indent_size: 4 }
        ))
        
        //.pipe(hash_src({build_dir: dist.html + '/**/*.html', src_path: dist.html + '/**/*.html', exts:['.js, .css']}))
        .pipe(dest(dist.html))
        .pipe(browserSync.reload({stream:true}))
        .on('end', () => {
            return (
                del([
                    'dist/html/_include',
                ])
            );
        })
    );
};

const hash = () => {
    return (
        src(dist.html + '/**/*.html')
        .pipe(hash_src({build_dir: './dist', src_path: './dist', exts:['.js','.css']}))
        .pipe(dest('./dist'))
    )
}

// CSS
const cssTask = () => {
    return (
        src(source.css + '*.{scss,css}')
        .pipe(plumber())
        //.pipe(sourcemaps.init())
        .pipe(sass({ 
            outputStyle: "compact", // nested, expanded, compact, compressed  
            indentType: "space", // space, tab
            indentWidth: 4,
            precision: 8, 
            sourceComments: false // 코멘트 제거 여부 
        })
        .on('error', sass.logError))                
        .pipe(autoprefixer({
            cascade: false
        }))
        //.pipe(postcss([cssnano]))        
        //.pipe(concat('ui.css'))        
        //.pipe(sourcemaps.write())                
        .pipe(dest(dist.css))        
        .pipe(browserSync.reload({stream:true}))
    );
};

// JS
const jsTask = () => {
    return (
        src(source.js + '*.js', {since: lastRun(jsTask)})        
        // .pipe(uglify())
        // .pipe(rename({'suffix':'.min'}))
        .pipe(dest(dist.js))
        .pipe(beautify.js(
            { indent_size: 4 }
        ))
        .pipe(browserSync.reload({stream:true}))
    );
};

const imgTask = () => {
    return (
        src(source.img + '**/*.{png,gif,jpg}')
        .pipe(dest(dist.img))
        .pipe(browserSync.reload({stream:true}))
    );
};

//Image Minify (build only)
const imgMinTask = () => {
    return (
        src([source.img + '**/*.{png,gif,jpg}'], {since: lastRun(imgMinTask)})
        .pipe(newer(dist.img))
        .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng(),
                imagemin.svgo([{removeViewBox: false}, {minifyStyles: false}])
            ], {verbose: true})
        )
        .pipe(dest(dist.img))
        .pipe(browserSync.reload({stream:true}))
    );
};

//Sprite
const autoSprite = (done) => {
    const spriteData = src(source.ir + '*.png')
        .pipe(spritesmith({
            retinaSrcFilter: [source.ir + '*@2x.png'],
            imgName: 'sprite.png',
            retinaImgName: 'sprite@2x.png',
            cssName: '_sprite.css',
            imgPath: '../images/sprite/sprite.png',
            retinaImgPath: '../images/sprite/sprite@2x.png',
            padding: 10,
        }));

    const imgStream = spriteData.img
        .pipe(dest(dist.img + 'sprite'));
    
    const cssStream = spriteData.css
         .pipe(sourcemaps.init())
        // .pipe(postcss([cssnano]))
        // .pipe(sourcemaps.write())
        .pipe(dest(source.css))
        .pipe(browserSync.reload({stream:true}))
        // .on('end', () => {
        //     return (
        //         del([
        //             'dist/html/_include',
        //         ])
        //     );
        // })

    return merge(imgStream, cssStream);
    
};

//Guide resources file move
const guideTask = () => {
    return (
        src(source.guide + '*.*')
        .pipe(dest(dist.guide))
        .pipe(browserSync.reload({stream:true}))
    );
};


/****************** Common [s] ******************/
const commonMove = () => {
    return (
        src([
            source.commonResource + '**/*.*'
        ])
        .pipe(dest(dist.commonResource))
        .pipe(browserSync.reload({stream:true}))
    )
};
const indexMove = () => {
    return (
        src([
            'sources/*.html', 
        ])
        .pipe(dest('dist/'))
        .pipe(browserSync.reload({stream:true}))
    )
};
const pathMove = () =>{
    return (
        src(source.path)
        .pipe(dest(dist.path))
        .pipe(browserSync.reload({stream:true}))
    )
}
/****************** Common [e] ******************/

// watch
const watchTask = () => {        
    watch(source.path, pathMove);    
    watch(source.commonResource, commonMove);    
    watch(source.html, htmlTask);
    watch(source.guide, guideTask);
    watch(source.css, cssTask);
    watch(source.js, jsTask);
    watch(source.img, imgMinTask);
    watch(source.ir, autoSprite);
};

const cleanAllTask = () => {
    return del(['dist/']);
};

// Server
const server = ()  => {
    return (
        browserSync.init({
            port: 5500,
            server:{
                baseDir: 'dist/'
            }
        })
    )
};

/****************** Common [e] *****************/

// exports
exports.clean = cleanAllTask;

//FRONT 
exports.default = series(  
    cleanAllTask,  
    pathMove,
    indexMove, 
    commonMove, 
    htmlTask,
    //removeHTML,
    autoSprite,
    cssTask,
    jsTask,
    imgTask,
    guideTask,
    hash,
    parallel(server,watchTask)
);

exports.build = series(
    cleanAllTask,
    pathMove,
    indexMove, 
    commonMove, 
    htmlTask,
    autoSprite,
    cssTask,
    jsTask,
    imgMinTask,
    guideTask,
    series(
        clearChanged,
        allChanged,
        copyToOriginal,
        createZIP
    )
);

function allChanged() {
	return src('./dist/**/*.*')
		.pipe(changed('./_original', {hasChanged: changed.compareContents}))
		.pipe(dest('./_changed'));
}

function copyToOriginal() {
	return src('./_changed/**/*.*')
		.pipe(dest('./_original'));
}

function createZIP() {
	let now = new Date();
	let y = now.getFullYear();
	let m = now.getMonth() + 1;
	let d = now.getDate();
	let h = now.getHours();
	let mm = now.getMinutes();

	m = (m <= 9) ? "0" + m : "" + m;
	d = (d <= 9) ? "0" + d : "" + d;
	h = (h <= 9) ? "0" + h : "" + h;
	mm = (mm <= 9) ? "0" + mm : "" + mm;

	let filename = "archive."+y+m+d+h+mm+".zip";

	return src('./_changed/**/*.*')
		.pipe(zip(filename))
		.pipe(dest('./_zip'));
}

function clearChanged() {
	return src('./_changed/*', {read: false})
		.pipe(clean());
}