import { createConnection } from 'typeorm';
// import * as config from '../../utils/config'

export const testConnection = (drop: boolean = false) => {
	return createConnection();
};
