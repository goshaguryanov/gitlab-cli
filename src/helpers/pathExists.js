const fsAsync = require('fs').promises

const pathExists = async (path) => {
    try {
        await fsAsync.access(path)

        return true
    } catch (error) {
        return false
    }
}

module.exports = pathExists
