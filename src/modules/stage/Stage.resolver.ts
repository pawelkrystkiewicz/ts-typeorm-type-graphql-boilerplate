import { Stage } from '@entities/config/Stage';
import { Args, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection, getRepository } from 'typeorm';
import { InsertStage, SelectStage } from './Input';
import { ApolloError } from 'apollo-server-core';
@Resolver()
export class StageResolver {
	private table = getRepository(Stage);

	@Query(() => [ Stage ], { nullable: true })
	async stages(@Args() { where, take, skip, order }: SelectStage) {
		return await this.table.find({ where: { ...where }, order: { ...order }, skip, take });
	}
	@Mutation(() => Stage, { nullable: true })
	async addStage(@Args() { name }: InsertStage) {
		const exists = await this.table.find({ where: { name } });

		if (!!exists)
		throw new ApolloError(`Record ${name} already exists`);
			await getConnection().createQueryBuilder().insert().into(Stage).values({ name }).execute();
			return await this.table.findOne({ where: { name } });
	}
}
