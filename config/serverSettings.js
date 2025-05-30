/**
 *
 *            Server specific settings
 *
 * *************************************************
 * * WARNING! Secrets should be read from env-vars *
 * *************************************************
 *
 */
const { getEnv, unpackApiKeysConfig, devDefaults } = require('kth-node-configuration')
const { safeGet } = require('safe-utils')

// DEFAULT SETTINGS used for dev, if you want to override these for you local environment, use env-vars in .env
const devPrefixPath = devDefaults('/api/kursplan')
const devSsl = devDefaults(false)
const devPort = devDefaults(3001)
// EXAMPLE: const devApiKeys = devDefaults('?name=devClient&apiKey=SET_YOUR_API_KEY&scope=write&scope=read')
const devApiKeys = devDefaults('?name=devClient&apiKey=5678&scope=write&scope=read')
// END DEFAULT SETTINGS

module.exports = {
  // The proxy prefix path if the application is proxied. E.g /places
  proxyPrefixPath: {
    uri: getEnv('SERVICE_PUBLISH', devPrefixPath),
  },
  useSsl: safeGet(() => getEnv('SERVER_SSL', devSsl + '').toLowerCase() === 'true'),
  port: getEnv('SERVER_PORT', devPort),

  ssl: {
    // In development we don't have SSL feature enabled
    pfx: getEnv('SERVER_CERT_FILE', ''),
    passphrase: getEnv('SERVER_CERT_PASSPHRASE', ''),
  },

  // API keys
  api_keys: unpackApiKeysConfig('KURSPLAN_API_KEYS', devApiKeys),

  // Logging
  logging: {
    log: {
      level: getEnv('LOGGING_LEVEL', 'debug'),
    },
    accessLog: {
      useAccessLog: safeGet(() => getEnv('LOGGING_ACCESS_LOG'), 'true') === 'true',
    },
  },
  cache: {},

  ladokMellanlagerApi: {
    clientId: getEnv('LADOK_AUTH_CLIENT_ID', null),
    clientSecret: getEnv('LADOK_AUTH_CLIENT_SECRET', null),
    tokenUrl: getEnv(
      'LADOK_AUTH_TOKEN_URL',
      devDefaults('https://login.microsoftonline.com/acd7f330-d613-48d9-85f2-258b1ac4a015/oauth2/v2.0/token')
    ),
    scope: getEnv('LADOK_AUTH_SCOPE', devDefaults('api://4afd7e46-019e-44e1-9630-12fdf9d31d02/.default')),
    baseUrl: getEnv('LADOK_BASE_URL', devDefaults('https://ladok-mellanlagring-lab.azure-api.net')),
    ocpApimSubscriptionKey: getEnv('LADOK_OCP_APIM_SUBSCRIPTION_KEY', null),
  },

  // Custom app settings
}
