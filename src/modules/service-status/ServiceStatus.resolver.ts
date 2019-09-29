import { Resolver, Query, Arg, ObjectType, Field } from 'type-graphql';
import GraphQLJSON from 'graphql-type-json';

const interval = 1000; // how often to refresh our measurement
const lag = require('event-loop-lag')(interval);
const os = require('os');


@Resolver()
export class ServiceStatus {
	@Query(() => GraphQLJSON, { nullable: true })
	async status(
		@Arg('echo', { nullable: true, defaultValue: 0 })
		echo?: number
	) {
		const beginWatch = process.hrtime();
		const cpuLoad = os.loadavg();
		const cpuInfo = os.cpus();
		const endWatch = process.hrtime(beginWatch);
		const execution_time = endWatch[0] + endWatch[1] / 1000000;
		return {
			echo,
			app: {
				name: process.env.APP_NAME,
				version: process.env.APP_VERSION,
				node: process.version,
				port: Number(process.env.PORT),
				pid: process.pid,
				up: process.uptime(),
				event_loop_lag: lag(),
				ram: process.memoryUsage(),
				cpu_usage: '?',
				author: 'pawelkrystkiewicz',
				ownership: 'pawelkrystkiewicz'
			},
			server: {
				os: {
					type: os.type(),
					platform: os.platform()
				},
				machine: process.env.COMPUTERNAME,
				loged_on: process.env.LOGONSERVER,
				lang: process.env.lang,
				ram: {
					total: os.totalmem(),
					free: os.freemem(),
					busy_percent: os.freemem() / os.totalmem()
				},

				cpu: {
					cores: process.env.NUMBER_OF_PROCESSORS,
					model: cpuInfo[0].model,
					load: {
						avg_1: cpuLoad[0],
						avg_5: cpuLoad[1],
						avg_15: cpuLoad[2]
					}
				},
				date: new Date().toISOString(),
				execution_time
			}
		};
	}
}
