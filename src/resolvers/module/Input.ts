import { Module } from '@entities/config/Module';
import { SharedSelectInput, SortOrder } from '@resolvers/shared/Input';
import { ArgsType, Field, InputType } from 'type-graphql';

@InputType()
export class WhereModule implements Partial<Module> {
	@Field({ nullable: true })
	name?: string;
}

@InputType()
export class OrderModule {
	@Field(() => SortOrder, { nullable: true })
	name?: SortOrder;

	@Field(() => SortOrder, { nullable: true })
	id?: SortOrder;
}
@ArgsType()
export class InsertModule implements Partial<Module> {
	@Field() name: string;
}

@ArgsType()
export class SelectModule extends SharedSelectInput {
	@Field(() => WhereModule, { nullable: true })
	where?: WhereModule;
	@Field(() => OrderModule, { nullable: true })
	order?: OrderModule;
}
