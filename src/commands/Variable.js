const fsAsync = require('fs').promises
const prompt = require('inquirer').createPromptModule()
const ApiService = require('../services/ApiService.js')
const { pathExists, isPath } = require('../helpers')

const Variable = () => {
    const instance = {}

    const parseValue = async (valueOrPath) => {
        let value = valueOrPath

        if (isPath(valueOrPath)) {
            if (await pathExists(valueOrPath)) {
                value = await fsAsync.readFile(valueOrPath, 'utf8')
            } else {
                const { usePathAsValue } = await prompt([{
                    name: 'usePathAsValue', type: 'confirm', message: 'Path you provided does not exist, did you mean to use path as variable value instead?', default: true
                }])

                if (!usePathAsValue) {
                    throw new Error(`File '${valueOrPath}' does not exist!`)
                }
            }
        }

        return value
    }

    return Object.freeze({
        ...instance,
        list: async (projectId) => ApiService.fetch(`/projects/${projectId}/variables`, { method: 'GET' }),
        get: async (projectId, name) => ApiService.fetch(`/projects/${projectId}/variables/${name}`, { method: 'GET' }),
        create: async (projectId, name, valueOrPath) => ApiService.fetch(`/projects/${projectId}/variables`, {
            method: 'POST',
            body: JSON.stringify({
                key: name,
                value: await parseValue(valueOrPath)
            })
        }),
        update: async (projectId, name, valueOrPath) => ApiService.fetch(`/projects/${projectId}/variables/${name}`, {
            method: 'PUT',
            body: JSON.stringify({
                key: name,
                value: await parseValue(valueOrPath)
            })
        }),
        delete: async (projectId, name) => ApiService.fetch(`/projects/${projectId}/variables/${name}`, {
            method: 'DELETE'
        })
    })
}

module.exports = Variable()
