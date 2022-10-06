const ApiService = require('./ApiService.js')

const IssueService = () => {
    const instance = {}

    return Object.freeze({
        ...instance,
        list: async (
            projectId,
            page = 1,
            perPage = 20,
            search,
            state,
            assignee,
            orderBy,
            sort,
            scope
        ) => {
            const urlParams = new URLSearchParams()
            const params = {
                page,
                perPage,
                search,
                state,
                assignee,
                orderBy,
                sort,
                scope
            }
            Object.keys(params).forEach((param) => {
                const value = params[param]

                if (!value) {
                    return
                }

                urlParams.append(param, value)
            })

            return ApiService.fetch(`/projects/${projectId}/issues?${urlParams.toString()}`, { method: 'GET' })
        },
        get: async (projectId, id) => ApiService.fetch(`/projects/${projectId}/issues/${id}`, { method: 'GET' }),
        create: async (projectId, payload) => ApiService.fetch(`/projects/${projectId}/issues`, {
            method: 'POST',
            body: JSON.stringify(payload)
        }),
        update: async (projectId, id, payload) => ApiService.fetch(`/projects/${projectId}/issues/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload)
        }),
        delete: async (projectId, id) => ApiService.fetch(`/projects/${projectId}/issues/${id}`, {
            method: 'DELETE'
        })
    })
}

module.exports = IssueService()
