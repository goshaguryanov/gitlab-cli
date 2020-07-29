const fs = require('fs')
const os = require('os')
const path = require('path')
const Logger = require('./Logger')

const ConfigService = () => {
    const configPath = process.env.GITLAB_CLI_CONFIG_PATH || path.join(os.homedir(), '.gitlabcli', 'config')

    let instance

    const saveConfigAsync = (config) => {
        fs.writeFile(configPath, JSON.stringify(config))
    }

    try {
        instance = JSON.parse(fs.readFileSync(configPath))
    } catch (error) {
        Logger.error(error.message)
        // failed reading config file so apply defaults

        instance = {
            token: undefined,
            baseUrl: 'https://gitlab.com/api/v4'
        }

        saveConfigAsync(instance)
    }

    return Object.freeze({
        ...instance,
        setToken: (token) => {
            instance.token = token

            saveConfigAsync(instance)
        },
        setBaseUrl: (baseUrl) => {
            instance.baseUrl = baseUrl

            saveConfigAsync(instance)
        }
    })
}

module.exports = ConfigService()
