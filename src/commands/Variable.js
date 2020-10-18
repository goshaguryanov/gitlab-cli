const fsAsync = require('fs').promises
const prompt = require('inquirer').createPromptModule()
const { VariableService, Logger } = require('../services')
const {
    resolveResult, catchAll, pathExists, globalArgs
} = require('../helpers')
const isPath = require('../helpers/isPath')

const Variable = () => {
    const instance = {}

    const parseValue = async (valueOrPath) => {
        let value = valueOrPath

        if (await pathExists(valueOrPath)) {
            value = await fsAsync.readFile(valueOrPath, 'utf8')
        } else if (isPath(valueOrPath)) {
            const { usePathAsValue } = await prompt([{
                name: 'usePathAsValue', type: 'confirm', message: 'Path you provided does not exist, did you mean to use path as variable value instead?', default: true
            }])

            if (!usePathAsValue) {
                throw new Error(`File '${valueOrPath}' does not exist!`)
            }
        }

        return value
    }

    return Object.freeze({
        ...instance,
        list: {
            command: 'variable-list <projectId>',
            describe: 'List variables for project',
            builder: globalArgs((yargs) => {
                yargs
                    .positional('projectId', {
                        describe: 'projectId for which variables are fetched'
                    })
            }),
            handler: catchAll(async (argv) => {
                const data = await VariableService.list(argv.projectId)

                resolveResult(data, () => {
                    Logger.print()
                    Logger.print('Variables')
                    Logger.print('---------')
                    data.forEach((item) => Logger.print(item.key))
                }, argv)
            })
        },
        get: {
            command: 'variable-get <projectId> <name>',
            describe: 'Print variable content',
            builder: globalArgs((yargs) => {
                yargs
                    .positional('projectId', {
                        describe: 'projectId for which variables are fetched'
                    })
                    .positional('name', {
                        describe: 'variable name'
                    })
            }),
            handler: catchAll(async (argv) => {
                const data = await VariableService.get(argv.projectId, argv.name)

                resolveResult(data, () => {
                    Logger.print(data.value)
                }, argv)
            })
        },
        create: {
            command: 'variable-create <projectId> <name> <valueOrPath>',
            describe: 'Create new variable',
            builder: globalArgs((yargs) => {
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
            }),
            handler: catchAll(async (argv) => {
                const data = await VariableService.create(
                    argv.projectId,
                    argv.name,
                    await parseValue(argv.valueOrPath)
                )

                resolveResult(data, () => {
                    Logger.print(`Variable '${data.key}' created!`)
                }, argv)
            })
        },
        update: {
            command: 'variable-update <projectId> <name> <valueOrPath>',
            describe: 'Update variable value',
            builder: globalArgs((yargs) => {
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
            }),
            handler: catchAll(async (argv) => {
                const data = await VariableService.update(
                    argv.projectId,
                    argv.name,
                    await parseValue(argv.valueOrPath)
                )

                resolveResult(data, () => {
                    Logger.print(`Variable '${data.key}' updated!`)
                }, argv)
            })
        },
        delete: {
            command: 'variable-delete <projectId> <name>',
            describe: 'Delete variable',
            builder: globalArgs((yargs) => {
                yargs
                    .positional('projectId', {
                        describe: 'projectId for which variable are fetched'
                    })
                    .positional('name', {
                        describe: 'variable name'
                    })
            }),
            handler: catchAll(async (argv) => {
                const { deleteConfirmed } = await prompt([{
                    name: 'deleteConfirmed', type: 'confirm', message: `Are you sure you wish to delete variable '${argv.name}'?`, default: false
                }])

                if (!deleteConfirmed) {
                    return
                }

                const data = await VariableService.delete(argv.projectId, argv.name)

                resolveResult(data, () => {
                    Logger.print(`Variable '${argv.name}' removed!`)
                }, argv)
            })
        }
    })
}

module.exports = Variable()
