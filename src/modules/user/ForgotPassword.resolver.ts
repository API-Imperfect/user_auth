import { Arg, Mutation, Resolver } from "type-graphql";
import { sendEmail } from "../../utils/sendEmail";
import { v4 } from "uuid";
import { redis } from "../../redis";
import { User } from "../../entity/User";
import {forgotPasswordPrefix} from "../contants/redisPrefixes";

@Resolver()
export class ForgotPasswordResolver {
    @Mutation(() => Boolean)
    async forgotPassword(@Arg("email") email: string): Promise<boolean> {
        const user = await User.findOne({ email });

        if (!user) {
            return true;
        }

        const token = v4();
        await redis.set(forgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 24); // 1 day
        // expiration

        await sendEmail(
            email,
            `http://localhost:3000/user/change-password/${token}`
        );

        return true;
    }
}
