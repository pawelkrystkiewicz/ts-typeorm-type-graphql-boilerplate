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

describe('Variable', () => {
	it('inserts new record', async () => {
		const variable = {
			name: `TEST_VARIABLE`,
			value: `3.14159265359`
		};

		const response = await callGraphql({
			source: statusQ,
			variableValues: variable
		});

		expect(response).toMatchObject({ data: { variable } });
	});
});
