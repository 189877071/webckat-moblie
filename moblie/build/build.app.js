'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.app.conf')
const fs = require('fs');
const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.app.assetsRoot, config.app.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    // 
    fs.readFile(config.app.index, (err, file) => {
      if(err) {
        console.log(chalk.red(' 读取文件失败 '));
        return;
      }
      
      file = file.toString().replace(/src=\//gi, 'src=').replace(/href=\//gi, 'href=').replace('<script src=static/js/browser.js></script>', '');

      fs.writeFile(config.app.index, file, (err) => {
        if(err) {
          console.log(chalk.red('修改文件失败'));
          return;
        }
        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
          '  Tip: built files are meant to be served over an HTTP server.\n' +
          '  Opening index.html over file:// won\'t work.\n'
        ));
      });
    });
  })
})
