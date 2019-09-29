import 'dotenv';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import cors = require('cors');
import express from 'express';
import 'reflect-metadata';
import { formatArgumentValidationError } from 'type-graphql';
// import { createConnection } from 'typeorm';
import { createSchema } from './utils/createSchema';
import * as config from './utils/config';
import { IContext } from './types/IContext';
import { createConnection } from 'typeorm';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

export const main = async () => {
	await createConnection();


	const schema = await createSchema();

	const apolloServer = new ApolloServer({
		schema,
		formatError: formatArgumentValidationError as any,
		context: ({ req, res }): IContext => ({ req, res }),
		playground: true
	});

	const app = express();
	const corsOptions: cors.CorsOptions = {
		origin: `${config.CORS_URL}`,
		credentials: true
	};
	const port = Number(config.PORT);

	app.get('/status', async (req, res) => {
		res.status(200).send('OK');
	});

	app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

	apolloServer.applyMiddleware({ app, cors: corsOptions });
	const httpServer = http.createServer(app);


	httpServer.listen(port, () => {
		console.log(`🚀 Server is ready on http://localhost:${port}${apolloServer.graphqlPath}`);
	});
};

main().catch((error) => console.error(error));
