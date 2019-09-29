import { Resolver, Query, Arg } from 'type-graphql';
import { Variables } from '../../entity/Variable';
import { getRepository } from 'typeorm';

@Resolver()
export class SMSStatusListener {
	private variablesRepository = getRepository(Variables);

	@Query(() => [ Variables ], { nullable: true })
	async variables() {
		return await this.variablesRepository.find({ order: { updatedAt: 'ASC' } });
	}
	@Query(() => Variables, { nullable: true })
	async variable(@Arg('name') variable: string) {
		return await this.variablesRepository.findOne({ where: { variable } });
	}
}
