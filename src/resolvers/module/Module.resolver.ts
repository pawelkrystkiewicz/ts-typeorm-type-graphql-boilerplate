import { Module } from '@entities/config/Module';
import { Args, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection, getRepository } from 'typeorm';
import { InsertModule, SelectModule } from './Input';
import { ApolloError } from 'apollo-server-core';
@Resolver()
export class ModuleResolver {
	private table = getRepository(Module);

	@Query(() => [ Module ], { nullable: true })
	async modules(@Args() { where, take, skip, order }: SelectModule) {
		return await this.table.find({ where: { ...where }, order: { ...order }, skip, take });
	}
	@Mutation(() => Module, { nullable: true })
	async addModule(@Args() { name }: InsertModule) {
		const exists = await this.table.findOne({ where: { name } });

		if (!!exists)
		throw new ApolloError(`Record ${name} already exists`);
			await getConnection().createQueryBuilder().insert().into(Module).values({ name }).execute();
			return await this.table.findOne({ where: { name } });
	}
}
