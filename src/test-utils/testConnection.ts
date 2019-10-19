import { createConnection } from 'typeorm';

export const testConnection =  () => {
	return createConnection();
};
