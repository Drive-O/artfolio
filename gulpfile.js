const gulp = require("gulp"),
watch = require("gulp-watch"),
postcss = require("gulp-postcss"),
imports = require("postcss-import"),
nesting = require("postcss-nesting"),
vars = require("postcss-simple-vars"),
mixins = require("postcss-mixins"),
prefix = require("autoprefixer"),
browserSync = require("browser-sync");

gulp.task("default", function(){
  console.log("Default Task");
})

gulp.task("css", function(){
    gulp.src("./app/assets/styles/styles.css")
    .pipe(postcss([imports, mixins, prefix, nesting, vars]))
    .on("error", function(errorStatus){
      console.log("Error " + errorStatus);
      this.emit("end");
    })
    .pipe(gulp.dest("./app/temp/styles/"));
})

gulp.task("cssInjection", ["css"], function(){
    gulp.src("./app/temp/styles/styles.css")
    .pipe(browserSync.stream());
});

gulp.task("watch", function(){
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  watch("./app/assets/styles/**/*.css", function(){
    gulp.start("cssInjection");
  });
  watch("./app/index.html", function(){
    browserSync.reload();
  })
})
