const fetch = require('node-fetch')
const Logger = require('./Logger')
const ConfigService = require('./ConfigService')

const DEFAULT_HEADERS = {
    'content-type': 'application/json'
}

const ApiService = () => {
    const instance = {}

    return Object.freeze({
        ...instance,
        fetch: async (resource, params) => {
            const { token } = ConfigService

            if (!token) {
                Logger.warn('Token is required before making any API calls. Use init command to configure gitlab-cli')
                return null
            }

            const data = await fetch(`${ConfigService.baseUrl}/api/v4${resource}`, {
                ...params,
                headers: {
                    ...params.headers,
                    ...DEFAULT_HEADERS,
                    'PRIVATE-TOKEN': token
                }
            })
                .then(async (res) => {
                    const result = await res.json()

                    if (!res.ok) {
                        throw new Error(result.message || result.error)
                    }

                    return result
                })
                .catch((error) => {
                    Logger.error(error.message)

                    return error
                })

            return data
        }
    })
}

module.exports = ApiService()
