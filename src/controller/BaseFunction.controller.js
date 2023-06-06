const fs = require('fs');

class BaseFunctionController {
    static readFileHTML(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    static writeFileData (filePath, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, data, (err) => {
                if (err) reject(err.message);
                else resolve();
            });
        });
    }
}

module.exports = BaseFunctionController;