const fs = require('fs')
const fsAsync = require('fs').promises
const os = require('os')
const path = require('path')
const Logger = require('./Logger')
const { pathExists } = require('../helpers')

const ConfigService = () => {
    const configDir = process.env.GITLAB_CLI_CONFIG_DIR || path.join(os.homedir(), '.gitlabcli')
    const configPath = path.join(configDir, 'config')

    let instance

    const saveConfigAsync = async (config) => {
        try {
            if (!(await pathExists(configDir))) {
                await fsAsync.mkdir(configDir)
            }

            await fsAsync.writeFile(configPath, JSON.stringify(config))

            return true
        } catch (error) {
            Logger.error(error.message)
            return false
        }
    }

    try {
        instance = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    } catch (error) {
        Logger.error(error.message)
        // failed reading config file so apply defaults

        instance = {
            token: undefined,
            baseUrl: 'https://gitlab.com'
        }

        saveConfigAsync(instance)
    }

    return Object.freeze({
        ...instance,
        init: async (token, baseUrl) => {
            instance.token = token
            instance.baseUrl = baseUrl

            await saveConfigAsync(instance)
        },
        setToken: async (token) => {
            instance.token = token

            await saveConfigAsync(instance)
        },
        setBaseUrl: async (baseUrl) => {
            instance.baseUrl = baseUrl

            await saveConfigAsync(instance)
        }
    })
}

module.exports = ConfigService()
