const { readdir, stat, appendFile, writeFile } = require('fs');

const { size, path } = require('./config').log;

module.exports = ({ ip = 'xxx.xxx.x.x', date = new Date().toString(), url = '*****', browser = '*****', err }) => readdir(path, (e, files) => {

    if (e) return;

    const str = `[${ip}] --- [${date}] --- [${url}] --- [${browser}] --- [${err}]\n`;

    if (files.length == 0) {
        writeFile(`${path}/0.log`, str);
        return;
    }
    
    stat(`${path}/${files[files.length - 1]}`, (e, stats) => {

        if (e) return;

        if (stats.size < size) {
            appendFile(`${path}/${files[files.length - 1]}`, str);
            return;
        }

        writeFile(`${path}/${files.length}.log`, str);
    })

});