import { Field, ObjectType } from 'type-graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class CommonColumns {
	@Field()
	@CreateDateColumn({ name: 'CreatedAt' })
	createdAt: Date;

	@Field()
	@UpdateDateColumn({ name: 'UpdatedAt' })
	updatedAt: Date;
}
