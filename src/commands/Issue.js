const { IssueService, Logger } = require('../services')
const {
    resolveResult, catchAll, globalArgs
} = require('../helpers')

const Issue = () => {
    const instance = {}

    return Object.freeze({
        ...instance,
        list: {
            command: 'issue-list <projectId> [page] [perPage]',
            describe: 'List issues for project',
            builder: globalArgs((yargs) => {
                yargs
                    .positional('projectId', {
                        describe: 'projectId for which issues are fetched'
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
                const data = await IssueService.list(argv.projectId, argv.page, argv.perPage)

                resolveResult(data, () => {
                    Logger.print()
                    Logger.print('Issues')
                    Logger.print('---------')
                    data.forEach(({
                        // eslint-disable-next-line camelcase
                        id, state, created_at, web_url
                    }) => Logger.print(id, state.toUpperCase(), created_at, web_url))
                }, argv)
            })
        },
    })
}

module.exports = Issue()
