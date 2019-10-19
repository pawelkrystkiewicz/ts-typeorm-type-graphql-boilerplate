import { testConnection } from './test-utils/testConnection';
import { Connection, createConnection } from 'typeorm';

let conn: Connection;
beforeAll(async () => {
	conn = await testConnection();
});

describe('Server', () => {
	it.only('creates connection', () => {
		expect(conn).toBeDefined();
		expect(conn.isConnected).toBe(true);
	});
});

afterAll(async () => await conn.close());
