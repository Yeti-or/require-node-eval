const fs = require('fs');
const path = require('path');

const nEval = require('node-eval');

const rEval = (filePath, pathToResolve) => {
    if (filePath[0] === '.') {
        if (!path.extname(filePath)) {
            filePath += '.js';
        }
        filePath = path.resolve(pathToResolve, filePath);

        const data = fs.readFileSync(filePath, 'utf-8');
        const dir = path.dirname(filePath);

        return nEval(data, filePath, { require: (p) => rEval(p, dir) });
    } else {
        return require(filePath);
    }
}

const filePath = './a/file.js';

// const hi = rEval(filePath, __dirname);

const data = fs.readFileSync(filePath, 'utf-8');

const hi = nEval(data, filePath, { require: (p) => rEval(p, './b') });

console.log('rEval: ', hi);
console.log('require: ', require(filePath));

