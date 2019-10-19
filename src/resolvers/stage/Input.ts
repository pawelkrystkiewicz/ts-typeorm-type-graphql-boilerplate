import { Stage } from '@entities/config/Stage';
import { SharedSelectInput, SortOrder } from '@resolvers/shared/Input';
import { ArgsType, Field, InputType } from 'type-graphql';

@InputType()
export class WhereStage implements Partial<Stage> {
  @Field({ nullable: true })
  name?: string;
}


@InputType()
export class OrderStage  {
  @Field(() => SortOrder, { nullable: true })
  name?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  id?: SortOrder;

}
@ArgsType()
export class InsertStage implements Partial<Stage> {
  @Field()
  name: string;
}

@ArgsType()
export class SelectStage extends SharedSelectInput {
  @Field(() => WhereStage, { nullable: true })
  where?: WhereStage;
  @Field(() => OrderStage, { nullable: true })
  order?: OrderStage;
}
