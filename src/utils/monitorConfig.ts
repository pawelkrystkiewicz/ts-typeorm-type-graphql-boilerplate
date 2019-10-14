import paths from '@root/paths';

export default {
	title: 'ts-typeorm-type-graphql-boilerplate',
	theme: 'default.css',
	path: '/',
	chartVisibility: {
		cpu: true,
		mem: true,
		load: true,
		responseTime: true,
		rps: true,
		statusCodes: true
	},
	ignoreStartsWith: '/admin',
	healthChecks: paths.filter((e) => e.key !== 'index')
};
