import { Setting } from '@entities/config/Setting';
import { Module } from '@entities/config/Module';
import { Stage } from '@entities/config/Stage';
import { ApolloError } from 'apollo-server-core';
import { Args, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection, getRepository } from 'typeorm';
import { SelectSetting, InsertSetting } from './Input';

@Resolver()
export class SettingResolver {
	private settingTable = getRepository(Setting);
	private moduleTable = getRepository(Module);
	private stageTable = getRepository(Stage);

	@Query(() => [ Setting ], { nullable: true })
	async settings(@Args() { where, order, take, skip }: SelectSetting) {
		if (where) {
			delete where.module;
			delete where.stage;
		}

		return await this.settingTable.find({
			where: { ...where },
			order: { ...order },
			take,
			skip
		});
	}
	@Mutation(() => Setting, { nullable: true })
	async addSetting(@Args() { name, value, stage, module }: InsertSetting) {
		const selectedModule = await this.moduleTable.findOne({ name: module });
		if (!selectedModule) throw new ApolloError(`Module ${module} does not exists`);
		console.log(selectedModule);
		const selectedStage = await this.stageTable.findOne({ name: stage });
		if (!selectedStage) throw new ApolloError(`Stage ${stage} does not exists`);
		console.log(selectedStage);

		const settingExists = await this.settingTable
			.createQueryBuilder('setting')
			.leftJoinAndSelect('setting.stage', 'stage')
			.leftJoinAndSelect('setting.module', 'module')
			.where('setting.name = :name', { name })
			.andWhere('stage.name = :stage', { stage })
			.andWhere('module.name = :module', { module })
			.getOne();

		console.log(settingExists);

		if (!!settingExists) throw new ApolloError(`Record ${name} already exists`);
		// await getConnection().createQueryBuilder().insert().into(Setting).values({ name, value }).execute();

		const newSetting = new Setting();

		this.settingTable.merge(newSetting, {
			name,
			stage: selectedStage,
			module: selectedModule,
			value
		});

		await this.settingTable.save(newSetting);
		return await this.settingTable.findOne({ where: { name, module: selectedModule, stage: selectedStage } });
	}
}
