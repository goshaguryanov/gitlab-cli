const Logger = require('../services/Logger')

const catchAll = (callback) => async (...args) => {
    try {
        return await callback(...args)
    } catch (error) {
        Logger.print(error.message)
    }

    return null
}

module.exports = catchAll
