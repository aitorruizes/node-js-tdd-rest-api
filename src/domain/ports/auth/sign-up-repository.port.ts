import type { UserEntity } from "@domain/entities/user/user.entity";

export interface SignUpRepositoryPort {
    execute(userEntity: Partial<UserEntity>): Promise<Partial<UserEntity>>;
}
