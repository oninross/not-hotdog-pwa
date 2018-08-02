# Not Hotdog PWA

Hotdog Not Hotdog image classifier with TensorFlowJS.  [Demo link](https://oninross.github.io/not-hotdog-pwa/)

Generated using
[generator-yeogurt@2.0.0](https://github.com/larsonjj/generator-yeogurt)

## Automated tasks

This project uses [Gulp](http://gulpjs.com) to run automated tasks for development and production builds.
The tasks are as follows:

`gulp --production`: Same as `gulp serve --production` also run `gulp test` and  not boot up production server

`gulp serve`: Compiles preprocessors and boots up development server
`gulp serve --open`: Same as `gulp serve` but will also open up site/app in your default browser
`gulp serve --production`: Same as `gulp serve` but will run all production tasks so you can view the site/app in it's final optimized form

`gulp test`: Lints all `*.js` file in the `source` folder using eslint and runs all `*.test.js` file unit tests through [Karma](http://karma-runner.github.io/0.13/index.html) and Jasmine
`gulp test --watch`: Same as `gulp test` but will constantly watch `*.test.js` files and rerun tests when changes are detected

***Adding the `--debug` option to any gulp task displays extra debugging information (ex. data being loaded into your templates)***

## Softwares
- Docker (https://store.docker.com/search?type=edition&offering=community): for initial setup of machine learning bits


## Folder structure
```
training
├── Docker
└── data
    └── images
        ├── hotdog
        │   ├── hotdog1.jpg
        │   ├── hotdog2.jpg
        │   ├── hotdog3.jpg
        │   └── ...
        └── not-hotdog
            ├── not-hotdog1.jpg
            ├── not-hotdog2.jpg
            ├── not-hotdog3.jpg
            └── ...

```

## Initial start up
Go to the root folder of the project and run the following code with Docker running in the background.  Change `/path/to/data` to the full path of where the training images are.  Take note that folders must not have spaces.  It will cause training issues.  The Docker file is included at the root folder of this project.

```
$ cd training
$ docker build -t model-builder .
$ docker run -v C:/xampp/htdocs/not-hotdog-pwa/ML/training/data:/data -it model-builder
```
