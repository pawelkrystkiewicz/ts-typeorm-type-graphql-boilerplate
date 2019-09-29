import { MiddlewareFn } from 'type-graphql';

export const ErrorInterceptor: MiddlewareFn<any> = async ({ context, info }, next) => {
	try {
		return await next();
	} catch (err) {
		// write error to file log
		console.log(err, context, info);

		// hide errors from db like printing sql query
		if (err) {
			throw new Error('Unknown error occurred!');
		}

		// rethrow the error
		throw err;
	}
};
