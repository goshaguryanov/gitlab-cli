const ApiService = require('../services/ApiService.js')

const Variable = () => {
    const instance = {}

    return Object.freeze({
        ...instance,
        list: async (projectId) => ApiService.fetch(`/projects/${projectId}/variables`, { method: 'GET' }),
        get: async (projectId, name) => ApiService.fetch(`/projects/${projectId}/variables/${name}`, { method: 'GET' })
    })
}

module.exports = Variable()
