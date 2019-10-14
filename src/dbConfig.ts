import { EntityOptions } from 'typeorm';
const schema = {
	config: 'config'
};

interface ConfigTables {
	settings: EntityOptions;
	stage: EntityOptions;
	module: EntityOptions;
}

interface DBSchema {
	config: ConfigTables;
}

export default <DBSchema>{
	config: {
		settings: {
			name: 'Settings',
			schema: schema.config,
			orderBy: { id: 'DESC' }
		},
		stage: {
			name: 'Stage',
			schema: schema.config,
			orderBy: { id: 'DESC' }
		},
		module: {
			name: 'Module',
			schema: schema.config,
			orderBy: { id: 'DESC' }
		}
	}
};