exports.FileUtils = {

    mkdirsSync: function (dirname) {
        const fs = require('fs');
        const path = require('path');

        if (fs.existsSync(dirname)) {
            return true;
        } else {
            if (this.mkdirsSync(path.dirname(dirname))) {
                fs.mkdirSync(dirname);
                return true;
            }
        }
    }
};