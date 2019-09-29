import { ObjectType, ID, Field } from 'type-graphql';
import {
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	Index,
	Entity
} from 'typeorm';

@ObjectType()
@Entity()
export class Variables extends BaseEntity {
	@Field(() => ID)
	@Index({ unique: true })
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column()
	value: string;

	@Field()
	@CreateDateColumn()
	createdAt: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt: Date;
}
