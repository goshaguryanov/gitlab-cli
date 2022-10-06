const yargsInstance = require('yargs')
const commands = require('./commands')
const services = require('./services')
const { catchAll } = require('./helpers')

const { ConfigService, ApiService } = services

ApiService.init({ configService: ConfigService })

// eslint-disable-next-line no-unused-expressions
yargsInstance
    .command('init <token> [baseUrl]', 'Configure cli for usage', (yargs) => {
        yargs
            .positional('token', {
                describe: 'Your gitlab access token (check here on how to generate https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)'
            })
            .positional('baseUrl', {
                describe: 'URL of your gitlab instance (defaults to https://gitlab.com)',
                default: 'https://gitlab.com'
            })
    }, catchAll(async (argv) => {
        await ConfigService.init(argv.token, argv.baseUrl)
    }))
    .command(commands.variable.list)
    .command(commands.variable.get)
    .command(commands.variable.create)
    .command(commands.variable.update)
    .command(commands.variable.delete)
    .command(commands.pipeline.list)
    .command(commands.pipeline.get)
    .command(commands.pipeline.create)
    .command(commands.pipeline.update)
    .command(commands.pipeline.delete)
    .command(commands.runner.list)
    .command(commands.runner.get)
    .command(commands.runner.enable)
    .command(commands.runner.disable)
    .command(commands.runner.delete)
    .command(commands.issue.list)
    .wrap(yargsInstance.terminalWidth())
    .argv

module.exports = services
