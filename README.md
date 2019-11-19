# Kursplan-api

## API to store information about course syllabuses

This API is made by the _Course Information Project (KIP)_ to support the micro service `kursinformation-web`.

### Where can I find all connected projects which depends on this API?

- [https://github.com/KTH/kursplan-web.git][web]
- [https://github.com/KTH/kursinfo-web.git][web]

### Where can I find all connected projects which logically connected with this API?

- [https://github.com/KTH/kursinfo-admin-web.git][web]
- [https://github.com/KTH/kursinfo-web.git][web]

This API is independent and will not break other projects but it is important remember it is logically connected to the bigger picture of course information.

### How to configure the application

1. Create a `.env` file.
2. Add an API key for `kursinfo-web`, assign it a strong password, and specifiy a read scope.

```
KURSPLAN_API_KEYS=?name=kursinfo-web&apiKey=PASSWORDg&scope=read
```

2. Add a Redis URI, including password, and other parameters.

```
REDIS_URI=REDIS_ADDRESS:REDIS_PORT,password=REDIS_PASSWORD,ssl=True,abortConnect=False
```

3. The `.env` file can also contain other keys. They have sufficient defaults for development, and don’t have to be added. Instead, these keys will be used in `secrets.env` or `docker-stack.yml`.

```
SERVICE_PUBLISH
# Default value is 'api/kursplan'
SERVER_SSL
# Default value is false
SERVER_PORT
# Default value is 3001
SERVER_CERT_FILE
# Default value is empty string, ''
SERVER_CERT_PASSPHRASE
# Default value is empty string, ''
LOGGING_LEVEL
# Default value is 'debug'
LOGGING_ACCESS_LOG
# Default value is 'true'
KOPPS_API_CACHE_EXPIRE_TIME
# Default value is 3600
KOPPS_URI
# Default value is 'https://api-r.referens.sys.kth.se/api/kopps/v2/?defaultTimeout=60000'
```

There’s also a `.env.in` template file which contains available keys.
