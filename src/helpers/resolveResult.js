const { Logger } = require('../services')

const resolveResult = (data, onSuccess) => {
    if (data instanceof Error || data.isError) {
        Logger.print(data.message)
        return
    }

    onSuccess()
}

module.exports = resolveResult
