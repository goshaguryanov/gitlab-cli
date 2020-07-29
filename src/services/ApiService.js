const fetch = require('node-fetch')
const Logger = require('./Logger')
const ConfigService = require('./ConfigService')

const DEFAULT_HEADERS = {
    'content-type': 'application/json'
}

const ApiService = () => {
    const instance = {}

    const parseErrorMessage = (data) => {
        if (typeof data.message === 'object') {
            return Object.values(data.message).join(', ')
        }

        if (typeof data.error === 'object') {
            return Object.values(data.error).join(', ')
        }

        if (data.message) {
            return data.message
        }

        if (data.error) {
            return data.error
        }

        return data
    }

    const parseResponse = async (res) => {
        try {
            const result = await res.json()

            return result
        } catch (error) {
            Logger.error(error.message)
        }

        return null
    }

    return Object.freeze({
        ...instance,
        fetch: async (resource, params) => {
            const { token } = ConfigService

            if (!token) {
                return new Error('Token is required before making any API calls. Use init command to configure gitlab-cli.')
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
                    const result = await parseResponse(res)

                    if (!res.ok) {
                        throw new Error(parseErrorMessage(result))
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
