const ApiService = require('./ApiService.js')

const PipelineService = () => {
    const instance = {}

    return Object.freeze({
        ...instance,
        list: async (projectId, page = 1, perPage = 20) => {
            const urlParams = new URLSearchParams()
            urlParams.append('page', page)
            urlParams.append('per_page', perPage)

            return ApiService.fetch(`/projects/${projectId}/pipelines?${urlParams.toString()}`, { method: 'GET' })
        },
        get: async (projectId, id, entity) => ApiService.fetch(`/projects/${projectId}/pipelines/${id}/${entity ? `/${entity}` : ''}`, { method: 'GET' }),
        create: async (projectId, ref) => ApiService.fetch(`/projects/${projectId}/pipeline?ref=${ref}`, {
            method: 'POST',
            body: JSON.stringify({
                variables: []
            })
        }),
        update: async (projectId, id, action) => ApiService.fetch(`/projects/${projectId}/pipelines/${id}/${action ? `/${action}` : ''}`, {
            method: 'POST'
        }),
        delete: async (projectId, id) => ApiService.fetch(`/projects/${projectId}/pipelines/${id}`, {
            method: 'DELETE'
        })
    })
}

module.exports = PipelineService()
