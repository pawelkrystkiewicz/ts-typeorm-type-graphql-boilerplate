# ts-typeorm-type-graphql-boilerplate
Boilerplate for typescript projects with typeorm and type-graphql

## Instalation
1. Clone project
2. Add .env
3. Add your db connection in ormconfig.json
4. `yarn && yarn start`
5. Checkout playground at http://localhost:4000/graphql


## ENV example
```
PORT=4000
CORS_URL='http://localhost:3000'
```

## ORMCONFIG example

```
{
	"type": "postgres",
	"username": "username",
	"database": "db_name",
	"password": "password",
	"host": "localhost",
	"port": 5432,
	"synchronize": true,
	"logging": true,
	"ssl": false,
	"entities": [ "src/entity/*.*" ],
	"typeRoots": [ "node_modules/@types", "node_modules/reflect-metadata" ]
}
```
##### Pawel Krystkiewicz 2019



