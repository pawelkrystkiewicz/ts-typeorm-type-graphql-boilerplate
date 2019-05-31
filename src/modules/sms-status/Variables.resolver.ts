import { Resolver, Query, Arg } from 'type-graphql';
import { Variables } from '../../entity/Variables';
import { getRepository } from 'typeorm';

@Resolver()
export class SMSStatusListener {
	@Query(() => String, { nullable: true })
	async test() {
		return 'OK';
	}
	@Query(() => [ Variables ], { nullable: true })
	async statuses() {
		const vars = await getRepository(Variables).find({ order: { updatedAt: 'ASC' } });
		return vars;
	}
	@Query(() => Variables, { nullable: true })
	async status(@Arg('variableName') variable: string) {
		const namedVar = await getRepository(Variables).findOne({ where: { variable } });
		return !!namedVar ? namedVar : null;
	}
}
