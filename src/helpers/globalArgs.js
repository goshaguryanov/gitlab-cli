const globalArgs = (callback) => (yargs) => {
    yargs.option('raw', {
        describe: 'Print raw JSON output. Useful inside CI/CD jobs/pipelines',
        type: 'boolean'
    })

    callback(yargs)
}

module.exports = globalArgs
