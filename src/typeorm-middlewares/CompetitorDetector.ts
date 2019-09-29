import { MiddlewareFn } from 'type-graphql';
export const CompetitorDetector: MiddlewareFn = async ({ args }, next) => {
	if (args.frameworkName === 'type-graphql') {
		return 'TypeGraphQL';
	}
	if (args.frameworkName === 'typegql') {
		throw new Error('Competitive framework detected!');
	}
	return next();
};
