const commands = require('./src/commands')
const { ConfigService, Logger } = require('./src/services')

require('yargs') // eslint-disable-line
    .command('init [token] [baseUrl]', 'list variables for project', (yargs) => {
        yargs
            .positional('token', {
                describe: 'Your gitlab access token (check here on how to generate https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)'
            })
            .positional('baseUrl', {
                describe: 'URL of your gitlab instance (defaults to https://gitlab.com)',
                default: 'https://gitlab.com'
            })
    }, async (argv) => {
        await ConfigService.init(argv.token, argv.baseUrl)
    })
    .command('variable list [projectId]', 'list variables for project', (yargs) => {
        yargs
            .positional('projectId', {
                describe: 'projectId for which variables are fetched'
            })
    }, async (argv) => {
        const data = await commands.variable.list(argv.projectId)

        Logger.print()
        Logger.print('Variables')
        Logger.print('---------')
        data.forEach((item, index) => Logger.print(index + 1, item.key))
    })
    .argv
