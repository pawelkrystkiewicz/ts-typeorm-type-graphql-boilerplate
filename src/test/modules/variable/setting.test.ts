import { Connection } from 'typeorm';
import { callGraphql } from '../../utils/callGraphql';
import { testConnection } from '../../utils/connections';

const statusQ = `

mutation addSetting(
	$name:$String!
	$value:$String!
	$stage:$String!
	$module:$String!
) {
  addSetting(
    name: $name
    value:$value
    stage:$stage
    module:$module
  ) {
    id
    name
    value
    module {
      name
    }
    stage {
      name
    }
    common {
      createdAt
      updatedAt
    }
  }
}

`;

let connection: Connection;
beforeAll(async () => {
	connection = await testConnection();
});
afterAll(async () => await connection.close());

describe('Setting', () => {
	it('inserts new record', async () => {
		const dataToInsert = {
			name: `PI`,
			value: `3.14159265359`,
			module: 'server',
			stage: 'test'
		};

		const response = await callGraphql({
			source: statusQ,
			variableValues: dataToInsert
		});

		expect(response).toMatchObject({
			data: {
				name: dataToInsert.name,
				value: dataToInsert.value,
				module: {
					name: dataToInsert.module
				},
				stage: {
					name: dataToInsert.stage
				}
			}
		});
	});
});
