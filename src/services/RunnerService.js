const ApiService = require('./ApiService.js')

const RunnerService = () => {
    const instance = {}

    return Object.freeze({
        ...instance,
        list: async (projectId, page = 1, perPage = 20) => {
            const urlParams = new URLSearchParams()
            urlParams.append('page', page)
            urlParams.append('per_page', perPage)

            return ApiService.fetch(`/projects/${projectId}/runners?${urlParams.toString()}`, { method: 'GET' })
        },
        get: async (id) => ApiService.fetch(`/runners/${id}`, { method: 'GET' }),
        enable: async (projectId, id) => ApiService.fetch(`/projects/${projectId}/runners`, {
            method: 'POST',
            body: JSON.stringify({
                runner_id: id
            })
        }),
        disable: async (projectId, id) => ApiService.fetch(`/projects/${projectId}/runners/${id}`, {
            method: 'DELETE'
        }),
        delete: async (id) => ApiService.fetch(`/runners/${id}`, {
            method: 'DELETE'
        })
    })
}

module.exports = RunnerService()
