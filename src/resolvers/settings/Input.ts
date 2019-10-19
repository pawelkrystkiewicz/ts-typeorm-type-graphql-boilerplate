import { Setting } from '@entities/config/Setting';
import { SharedSelectInput, SortOrder } from '@resolvers/shared/Input';
import { ArgsType, Field, InputType } from 'type-graphql';

@InputType()
export class WhereSetting {
	@Field({ nullable: true })
	name?: string;

	@Field({ nullable: true })
	value?: string;

	@Field({ nullable: true })
	stage?: string;

	@Field({ nullable: true })
	module?: string;
}

@InputType()
export class OrderSetting {
	@Field(() => SortOrder, { nullable: true })
	name?: SortOrder;

	@Field(() => SortOrder, { nullable: true })
	id?: SortOrder;
}

@ArgsType()
export class InsertSetting {
	@Field() name: string;

	@Field() value: string;

	@Field() stage: string;

	@Field() module: string;
}

@ArgsType()
export class SelectSetting extends SharedSelectInput {
	@Field(() => WhereSetting, { nullable: true })
	where?: WhereSetting;
	@Field(() => OrderSetting, { nullable: true })
	order?: OrderSetting;
}
