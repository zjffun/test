var gulp = require("gulp");
var typescript = require("typescript");
var ts = require("gulp-typescript");

var tsProject = ts.createProject("./tsconfig.json", { typescript });

gulp.task("scripts", function () {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
});
