import { IsNumber } from 'class-validator';
import { ArgsType, Field, registerEnumType } from 'type-graphql';

export enum SortOrder {
	ASC = 'ASC',
	DESC = 'DESC'
}
registerEnumType(SortOrder, { name: 'SortOrder' });

@ArgsType()
export class SharedSelectInput {
	@IsNumber()
	@Field({ nullable: true })
	take: number;

	@IsNumber()
	@Field({ nullable: true })
	skip: number;
}
