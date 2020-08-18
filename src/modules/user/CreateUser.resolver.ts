import { Arg, ClassType, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

function createBaseResolver<T extends ClassType, X extends ClassType>(
    suffix: string,
    returnType: T,
    inputType: X,
    entity: any
) {
    @Resolver({ isAbstract: true })
    abstract class BaseResolver {
        @Mutation(() => returnType, { name: `create${suffix}` })
        async create(@Arg("data", () => inputType) data: any) {
            return entity.create(data).save();
        }
    }

    return BaseResolver;
}

const BaseCreateUser = createBaseResolver("User", User, RegisterInput, User);

@Resolver()
export class CreateUserResolver extends BaseCreateUser {
    // @Mutation(() => User)
    // async createUser(@Arg("data") data: RegisterInput) {
    //     return User.create(data).save();
    // }
}