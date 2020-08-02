const Logger = require('../services/Logger')

const resolveResult = (data, onSuccess) => {
    if (data instanceof Error) {
        Logger.print(data.message)
        return
    }

    onSuccess()
}

module.exports = resolveResult
