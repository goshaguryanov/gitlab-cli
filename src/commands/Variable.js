const ApiService = require('../services/ApiService.js')

const Variable = () => {
    const instance = {}

    return Object.freeze({
        ...instance,
        list: async (projectId) => ApiService.fetch(`/projects/${projectId}/variables`, { method: 'GET' }),
        get: async (projectId, name) => ApiService.fetch(`/projects/${projectId}/variables/${name}`, { method: 'GET' }),
        create: async (projectId, name, value) => ApiService.fetch(`/projects/${projectId}/variables`, {
            method: 'POST',
            body: JSON.stringify({
                key: name,
                value
            })
        }),
        update: async (projectId, name, value) => ApiService.fetch(`/projects/${projectId}/variables/${name}`, {
            method: 'PUT',
            body: JSON.stringify({
                key: name,
                value
            })
        })
    })
}

module.exports = Variable()
