const fs = require('fs')

const readFile = (fileName) => {
    return JSON.parse(fs.readFileSync(`./model/${fileName}`, 'utf8'));
}

const writeFile = (fileName, data) => {
    return fs.writeFileSync(`./model/${fileName}`, JSON.stringify(data, null, 4));
}

module.exports = {
    readFile,
    writeFile
}