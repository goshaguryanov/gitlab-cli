const prompt = require('inquirer').createPromptModule()
const { RunnerService, Logger } = require('../services')
const {
    resolveResult, catchAll, globalArgs
} = require('../helpers')

const Runner = () => {
    const instance = {}

    return Object.freeze({
        ...instance,
        list: {
            command: 'runner-list <projectId> [page] [perPage]',
            describe: 'List runners for project',
            builder: globalArgs((yargs) => {
                yargs
                    .positional('projectId', {
                        describe: 'projectId for which runners are fetched'
                    })
                    .positional('page', {
                        describe: 'page number to list',
                        default: 1
                    })
                    .positional('perPage', {
                        describe: 'results to show per page (max=100)',
                        default: 20
                    })
            }),
            handler: catchAll(async (argv) => {
                const data = await RunnerService.list(argv.projectId, argv.page, argv.perPage)

                resolveResult(data, () => {
                    Logger.print()
                    Logger.print('Runners')
                    Logger.print('---------')
                    data.forEach(({
                        // eslint-disable-next-line camelcase
                        id, status, description, ip_address
                    }) => Logger.print(id, description, status.toUpperCase(), ip_address))
                }, argv)
            })
        },
        get: {
            command: 'runner-get <projectId> <id>',
            describe: 'Get runner details',
            builder: globalArgs((yargs) => {
                yargs
                    .positional('projectId', {
                        describe: 'projectId for which runners are fetched'
                    })
                    .positional('id', {
                        describe: 'runner id'
                    })
                    .option('entity', {
                        describe: 'get other entities for runner',
                        choices: ['variables', 'test_report']
                    })
            }),
            handler: catchAll(async (argv) => {
                const data = await RunnerService.get(argv.id)

                resolveResult(data, () => {
                    if (argv.entity && data.length === 0) {
                        Logger.print(`No ${argv.entity}`)
                        return
                    }

                    Object.keys(data).forEach((key) => {
                        switch (key) {
                        default:
                            Logger.print(`${key}:`, data[key])
                        }
                    })
                }, argv)
            })
        },
        enable: {
            command: 'runner-enable <projectId> <id>',
            describe: 'Enable runner for project',
            builder: globalArgs((yargs) => {
                yargs
                    .positional('projectId', {
                        describe: 'projectId for which runners are fetched'
                    })
                    .positional('id', {
                        describe: 'runner id'
                    })
            }),
            handler: catchAll(async (argv) => {
                const data = await RunnerService.enable(
                    argv.projectId,
                    argv.id,
                )

                resolveResult(data, () => {
                    Logger.print(`Runner #${argv.id} enabled for project #${argv.projectId}...`)
                }, argv)
            })
        },
        disable: {
            command: 'runner-disable <projectId> <id>',
            describe: 'Disable runner for project',
            builder: globalArgs((yargs) => {
                yargs
                    .positional('projectId', {
                        describe: 'projectId for which runners are fetched'
                    })
                    .positional('id', {
                        describe: 'runner id'
                    })
            }),
            handler: catchAll(async (argv) => {
                const { disableConfirmed } = await prompt([{
                    name: 'disableConfirmed', type: 'confirm', message: `Are you sure you wish to disable runner #${argv.id} for project #${argv.projectId}?`, default: false
                }])

                if (!disableConfirmed) {
                    return
                }

                const data = await RunnerService.disable(
                    argv.projectId,
                    argv.id,
                )

                resolveResult(data, () => {
                    Logger.print(`Runner #${argv.id} disabled for project #${argv.projectId}...`)
                }, argv)
            })
        },
        delete: {
            command: 'runner-delete <id>',
            describe: 'Delete runner',
            builder: globalArgs((yargs) => {
                yargs
                    .positional('projectId', {
                        describe: 'projectId for which runners are fetched'
                    })
                    .positional('id', {
                        describe: 'runner id'
                    })
            }),
            handler: catchAll(async (argv) => {
                const { deleteConfirmed } = await prompt([{
                    name: 'deleteConfirmed', type: 'confirm', message: `Are you sure you wish to delete runner #${argv.id}?`, default: false
                }])

                if (!deleteConfirmed) {
                    return
                }

                const data = await RunnerService.delete(argv.id)

                resolveResult(data, () => {
                    Logger.print(`Runner #${argv.id} removed!`)
                }, argv)
            })
        }
    })
}

module.exports = Runner()
