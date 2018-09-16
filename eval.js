const fs = require('fs');
const path = require('path');

const nEval = require('node-eval');

const rEval = (filePath, pathToResolve) => {
    if (filePath[0] === '.') {
        if (!path.extname(filePath)) {
            filePath += '.js';
        }
        const data = fs.readFileSync(path.resolve(pathToResolve, filePath), 'utf-8');

        const dir = path.dirname(filePath);

        return nEval(data, filePath, { require: (p) => rEval(p, dir) });
    }
}

const filePath = './a/file.js';

// const hi = rEval(filePath, __dirname);

const data = fs.readFileSync(filePath, 'utf-8');

const hi = nEval(data, filePath, { require: (p) => rEval(p, './b') });

console.log('hi!', hi);

