import type { UserGatewayPort } from "@application/ports/user/user-gateway.port";
import type { UserEntity } from "@domain/entities/user/user.entity";
import type { SignUpRepositoryPort } from "@domain/ports/auth/sign-up-repository.port";

export default class SignUpRepository implements SignUpRepositoryPort {
    constructor(private userGateway: UserGatewayPort) {}

    public async execute(
        userEntity: Partial<UserEntity>,
    ): Promise<Partial<UserEntity>> {
        try {
            return await this.userGateway.insertUser(userEntity);
        } catch (err) {
            console.error(err);

            throw err;
        }
    }
}
