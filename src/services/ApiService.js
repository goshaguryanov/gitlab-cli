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
                Logger.warn('Token is required before making any API calls. Add --init argument to configure gitlab-cli')
                return null
            }

            const data = await fetch(`${ConfigService.baseUrl}${resource}`, {
                ...params,
                headers: {
                    ...params.headers,
                    ...DEFAULT_HEADERS,
                    'PRIVATE-TOKEN': token
                }
            })
                .then((res) => res.json())
                .catch((error) => Logger.error(error.message))

            return data
        }
    })
}

module.exports = ApiService()
