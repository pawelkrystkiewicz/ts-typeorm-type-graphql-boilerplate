import { Connection } from 'typeorm';
import { callGraphql } from '../../utils/callGraphql';
import { testConnection } from '../../utils/connections';

const statusQ = `query status($echo: Float) {
  status(echo: $echo)
}`;

let connection: Connection;
beforeAll(async () => {
	connection = await testConnection();
});

afterAll(async () => {
	connection.close();
});

describe('HealthChecker', () => {
	it('echos given value', async () => {
		const echo = 2;
		const response = await callGraphql({
			source: statusQ,
			variableValues: { echo }
		});

		expect(response).toMatchObject({ data: { status: { echo } } });
	});
});
