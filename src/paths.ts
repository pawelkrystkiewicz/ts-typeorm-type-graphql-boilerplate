import { PORT as port } from '@root/utils/config';

const protocol = 'http';
const host = 'localhost';

export default [
	{
		protocol,
		host,
		port,
		path: '/',
		description: 'Status monitor',
		key: 'index'
	},
	{
		protocol,
		host,
		port,
		path: '/status',
		description: 'Return 200 OK',
		key: 'status'
	},
	{
		protocol,
		host,
		port,
		path: '/graphql',
		description: 'graphql endpoint',
		key: 'graphql'
	},
	{
		protocol,
		host,
		port,
		path: '/voyager',
		description: 'Schema voyager',
		key: 'voyager'
	}
];
