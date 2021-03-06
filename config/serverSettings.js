/**
 *
 *            Server specific settings
 *
 * *************************************************
 * * WARNING! Secrets should be read from env-vars *
 * *************************************************
 *
 */
const { getEnv, unpackKOPPSConfig, unpackApiKeysConfig, unpackRedisConfig, devDefaults } = require('kth-node-configuration')
const { safeGet } = require('safe-utils')

// DEFAULT SETTINGS used for dev, if you want to override these for you local environment, use env-vars in .env
const devPrefixPath = devDefaults('/api/kursplan')
const devSsl = devDefaults(false)
const devPort = devDefaults(3001)
// EXAMPLE: const devApiKeys = devDefaults('?name=devClient&apiKey=SET_YOUR_API_KEY&scope=write&scope=read')
const devApiKeys = devDefaults('?name=devClient&apiKey=5678&scope=write&scope=read')
const devKOPPSURI = devDefaults('https://api-r.referens.sys.kth.se/api/kopps/v2/?defaultTimeout=60000')
// END DEFAULT SETTINGS
const devRedis = devDefaults('redis://localhost:6379/')

module.exports = {
  // The proxy prefix path if the application is proxied. E.g /places
  proxyPrefixPath: {
    uri: getEnv('SERVICE_PUBLISH', devPrefixPath)
  },
  useSsl: safeGet(() => getEnv('SERVER_SSL', devSsl + '').toLowerCase() === 'true'),
  port: getEnv('SERVER_PORT', devPort),

  ssl: {
    // In development we don't have SSL feature enabled
    pfx: getEnv('SERVER_CERT_FILE', ''),
    passphrase: getEnv('SERVER_CERT_PASSPHRASE', '')
  },

  // API keys
  api_keys: unpackApiKeysConfig('KURSPLAN_API_KEYS', devApiKeys),

  // Logging
  logging: {
    log: {
      level: getEnv('LOGGING_LEVEL', 'debug')
    },
    accessLog: {
      useAccessLog: safeGet(() => getEnv('LOGGING_ACCESS_LOG'), 'true') === 'true'
    }
  },
  cache: {
    koppsApi: {
      redis: unpackRedisConfig('REDIS_URI', devRedis),
      expireTime: getEnv('KOPPS_API_CACHE_EXPIRE_TIME', 60 * 60) // 60 minuteS
    }
  },

  koppsApi: unpackKOPPSConfig('KOPPS_URI', devKOPPSURI)

  // Custom app settings
}
