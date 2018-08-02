'use strict';

import path from 'path';

export default function (gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let dest = path.join(dirs.assets, dirs.models.replace(/^_/, ''));
  dest = path.join(taskTarget, dest);

  // Copy models
  gulp.task('copyModels', () => {
    return gulp.src(path.join(dirs.source, dirs.models, '**/*'))
      .pipe(gulp.dest(dest))
  });
}
