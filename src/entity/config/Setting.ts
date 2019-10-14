import dbConfig from '@root/dbConfig';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Entity, Index, PrimaryGeneratedColumn, ManyToOne, Column, JoinTable, RelationOptions } from 'typeorm';
import { CommonColumns } from '../CommonColumns';
import { Stage } from './Stage';
import { Module } from './Module';

const relationConfig:RelationOptions = {
	eager: true,
	cascade: true,
	onDelete: 'CASCADE',
	nullable: true
};

@ObjectType()
@Entity({ ...dbConfig.config.settings })
export class Setting extends BaseEntity {
	@Field(() => ID)
	@Index({ unique: true })
	@PrimaryGeneratedColumn('increment', { name: 'Id' })
	id: number;

	@Field(() => Stage)
	@ManyToOne(() => Stage, (stage) => stage.id, relationConfig)
	@JoinTable()
	stage: Stage;

	@Field(() => Module)
	@ManyToOne(() => Module, (module) => module.id, relationConfig)
	@JoinTable()
	module: Module;

	@Field()
	@Column({ name: 'Name' })
	name: string;

	@Field()
	@Column({ name: 'Value' })
	value: string;

	@Field((type) => CommonColumns)
	@Column((type) => CommonColumns)
	common: CommonColumns;
}
