const commands = require('./src/commands')
const { ConfigService, Logger } = require('./src/services')

require('yargs') // eslint-disable-line
    .command('init [token] [baseUrl]', 'Configure cli for usage', (yargs) => {
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
    .command('variable list [projectId]', 'List variables for project', (yargs) => {
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
    .command('variable get [projectId] [name]', 'Print variable content', (yargs) => {
        yargs
            .positional('projectId', {
                describe: 'projectId for which variables are fetched'
            })
            .positional('name', {
                describe: 'variable name'
            })
    }, async (argv) => {
        const data = await commands.variable.get(argv.projectId, argv.name)

        Logger.print(data.value)
    })
    .command('variable create [projectId] [name] [value]', 'Create new variable', (yargs) => {
        yargs
            .positional('projectId', {
                describe: 'projectId for which variable are fetched'
            })
            .positional('name', {
                describe: 'variable name'
            })
            .positional('value', {
                describe: 'variable value'
            })
    }, async (argv) => {
        const data = await commands.variable.create(argv.projectId, argv.name, argv.value)

        Logger.print(`Variable '${data.key}' created!`)
    })
    .argv
