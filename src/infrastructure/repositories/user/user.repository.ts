import type { UserEntity } from "@domain/entities/user/user.entity";
import type { UserPersistence } from "@domain/ports/user/user.port";

export default class UserRepository {
    constructor(private userGateway: UserPersistence) {}

    public async createUser(
        userEntity: Partial<UserEntity>,
    ): Promise<Partial<UserEntity>> {
        try {
            return await this.userGateway.createUser(userEntity);
        } catch (err) {
            console.error(err);

            throw err;
        }
    }
}
