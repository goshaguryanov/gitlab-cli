const Logger = () => Object.freeze({
    log: (...args) => {
        if (!process.env.NODE_ENV !== 'production' || !!process.env.DEBUG) {
            console.log(...args)
        }
    },
    warn: (...args) => {
        if (!process.env.NODE_ENV !== 'production' || !!process.env.DEBUG) {
            console.warn(...args)
        }
    },
    error: (...args) => {
        if (!process.env.NODE_ENV !== 'production' || !!process.env.DEBUG) {
            console.error(...args)
        }
    }
})

module.exports = Logger()
