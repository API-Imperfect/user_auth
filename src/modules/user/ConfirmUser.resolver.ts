import { Arg, Mutation, Resolver } from "type-graphql";
import { redis } from "../../redis";
import { User } from "../../entity/User";
import { userConfirmationPrefix } from "../contants/redisPrefixes";

@Resolver()
export class ConfirmUserResolver {
    @Mutation(() => Boolean)
    async confirmUser(@Arg("token") token: string): Promise<boolean> {
        const userId = await redis.get(userConfirmationPrefix + token);

        if (!userId) {
            return false;
        }

        await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
        await redis.del(token);

        return true;
    }
}
