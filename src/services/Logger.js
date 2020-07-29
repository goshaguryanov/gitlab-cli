const Logger = () => Object.freeze({
    print: (...args) => {
        console.log(...args)
    },
    log: (...args) => {
        if (process.env.NODE_ENV !== 'production' || !!process.env.VERBOSE) {
            console.log('[LOG]', ...args)
        }
    },
    warn: (...args) => {
        if (process.env.NODE_ENV !== 'production' || !!process.env.VERBOSE) {
            console.warn('[WARN]', ...args)
        }
    },
    error: (...args) => {
        if (process.env.NODE_ENV !== 'production' || !!process.env.VERBOSE) {
            console.error('[ERROR]', ...args)
        }
    }
})

module.exports = Logger()
