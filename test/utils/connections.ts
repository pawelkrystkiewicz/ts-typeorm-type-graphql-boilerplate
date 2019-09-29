import { createConnection } from 'typeorm';

export const testConnection = (drop: boolean = false) => {
	return createConnection({
		name: 'default',
		type: 'postgres',
		host: 'ec2-79-125-4-96.eu-west-1.compute.amazonaws.com',
		port: 5432,
		username: 'emsmeejktoqyef',
		password: 'd4522c49d92ed76660af57b8954b8b1181919321f39be14c102929cc99846bb4',
		database: 'dduslfvtvrkoru',
		synchronize: drop,
		dropSchema: drop,
		logging: false,
		ssl: true,
		entities: [ 'src/entity/**/*.*' ],
		migrations: [ 'src/migration/**/*.ts' ],
		subscribers: [ 'src/subscriber/**/*.ts' ]
	});
};
