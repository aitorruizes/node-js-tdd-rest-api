import type { UserEntity } from "@domain/entities/user/user.entity";

export interface UserGatewayPort {
    insertUser(userEntity: Partial<UserEntity>): Promise<Partial<UserEntity>>;
}
