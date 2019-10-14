import dbConfig from '@root/dbConfig';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {CommonColumns} from '../CommonColumns'
import { Setting } from './Setting';
@ObjectType()
@Entity({ ...dbConfig.config.stage })
export class Stage extends BaseEntity {
	@Field(() => ID)
	@Index({ unique: true })
	@PrimaryGeneratedColumn('increment', { name: 'Id' })
	id: number;

	@Field()
	@Column({ name: 'Name' ,unique:true, nullable:false})
	name: string;

	@OneToMany(() => Setting, (setting) => setting.stage)
	stage: Setting[];

	@Field(()=>CommonColumns)
	@Column((type) => CommonColumns)
	common: CommonColumns;
}
