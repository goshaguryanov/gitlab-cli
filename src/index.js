const prompt = require('inquirer').createPromptModule()
const yargsInstance = require('yargs')
const commands = require('./commands')
const { ConfigService, Logger } = require('./services')
const { resolveResult } = require('./helpers')

const catchAll = (callback) => async (...args) => {
    try {
        return await callback(...args)
    } catch (error) {
        Logger.print(error.message)
    }

    return null
}

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
    .command('variable-list <projectId>', 'List variables for project', (yargs) => {
        yargs
            .positional('projectId', {
                describe: 'projectId for which variables are fetched'
            })
    }, catchAll(async (argv) => {
        const data = await commands.variable.list(argv.projectId)

        resolveResult(data, () => {
            Logger.print()
            Logger.print('Variables')
            Logger.print('---------')
            data.forEach((item) => Logger.print(item.key))
        })
    }))
    .command('variable-get <projectId> <name>', 'Print variable content', (yargs) => {
        yargs
            .positional('projectId', {
                describe: 'projectId for which variables are fetched'
            })
            .positional('name', {
                describe: 'variable name'
            })
    }, catchAll(async (argv) => {
        const data = await commands.variable.get(argv.projectId, argv.name)

        resolveResult(data, () => {
            Logger.print(data.value)
        })
    }))
    .command('variable-create <projectId> <name> <valueOrPath>', 'Create new variable', (yargs) => {
        yargs
            .positional('projectId', {
                describe: 'projectId for which variable are fetched'
            })
            .positional('name', {
                describe: 'variable name'
            })
            .positional('valueOrPath', {
                describe: 'variable value or path to file'
            })
    }, catchAll(async (argv) => {
        const data = await commands.variable.create(argv.projectId, argv.name, argv.valueOrPath)

        resolveResult(data, () => {
            Logger.print(`Variable '${data.key}' created!`)
        })
    }))
    .command('variable-update <projectId> <name> <valueOrPath>', 'Update variable value', (yargs) => {
        yargs
            .positional('projectId', {
                describe: 'projectId for which variable are fetched'
            })
            .positional('name', {
                describe: 'variable name'
            })
            .positional('valueOrPath', {
                describe: 'variable value or path to file'
            })
    }, catchAll(async (argv) => {
        const data = await commands.variable.update(argv.projectId, argv.name, argv.valueOrPath)

        resolveResult(data, () => {
            Logger.print(`Variable '${data.key}' updated!`)
        })
    }))
    .command('variable-delete <projectId> <name>', 'Remove variable', (yargs) => {
        yargs
            .positional('projectId', {
                describe: 'projectId for which variable are fetched'
            })
            .positional('name', {
                describe: 'variable name'
            })
    }, catchAll(async (argv) => {
        const { deleteConfirmed } = await prompt([{
            name: 'deleteConfirmed', type: 'confirm', message: `Are you sure you wish to delete variable '${argv.name}'?`, default: false
        }])

        if (!deleteConfirmed) {
            return
        }

        const data = await commands.variable.delete(argv.projectId, argv.name)

        resolveResult(data, () => {
            Logger.print(`Variable '${argv.name}' removed!`)
        })
    }))
    .wrap(yargsInstance.terminalWidth())
    .argv

module.exports = commands
