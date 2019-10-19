import { buildSchema } from 'type-graphql';
import { ResolveTime } from '../typeorm-middlewares/ResolveTime';
import { ErrorInterceptor } from '../typeorm-middlewares/ErrorInterceptor';
import { CompetitorDetector } from '../typeorm-middlewares/CompetitorDetector';

export const createSchema = () =>
	buildSchema({
		resolvers: [ __dirname + '/../resolvers/**/*.resolver.?s' ],
		globalMiddlewares: [ ResolveTime,  CompetitorDetector ]
	});
