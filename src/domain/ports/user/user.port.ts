import type { UserEntity } from "@domain/entities/user/user.entity";

export interface UserPersistence {
    createUser(userEntity: Partial<UserEntity>): Promise<Partial<UserEntity>>;
}
