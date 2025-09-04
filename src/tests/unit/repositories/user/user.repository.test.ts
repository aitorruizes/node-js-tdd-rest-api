import type { UserEntity } from "@domain/entities/user/user.entity";
import type { UserPersistence } from "@domain/ports/user/user.port";
import UserRepository from "@infrastructure/repositories/user/user.repository";
import { describe, expect, it, type Mock, vi } from "vitest";

type MakeSutReturn = {
    userRepository: UserRepository;
    createUserMock: Mock;
    userEntityMock: Partial<UserEntity>;
};

const makeSut = (): MakeSutReturn => {
    const userEntityMock: Partial<UserEntity> = {
        id: "1",
        samp_username: "John_Doe",
        email: "johndoe@gmail.com",
    };

    const createUserMock: Mock = vi.fn().mockResolvedValue(userEntityMock);

    const userGatewayMock: UserPersistence = {
        createUser: createUserMock,
    } as UserPersistence;

    const userRepository: UserRepository = new UserRepository(userGatewayMock);

    return { userRepository, createUserMock, userEntityMock };
};

describe("user repository", () => {
    it("should successfully create a new user", async () => {
        const { userRepository, createUserMock, userEntityMock } = makeSut();

        const userEntity: Partial<UserEntity> = {
            samp_username: "John_Doe",
            email: "johndoe@gmail.com",
            ip_address: "127.0.0.1",
            password: "Test$123",
        };

        const result: Partial<UserEntity> = await userRepository.createUser(
            userEntity
        );

        expect(result).toBeDefined();
        expect(result).toEqual(userEntityMock);
        expect(createUserMock).toHaveBeenCalledTimes(1);
        expect(createUserMock).toHaveBeenCalledWith(userEntity);
    });

    it("should throw error when createUser fails", async () => {
        const { userRepository, createUserMock } = makeSut();

        createUserMock.mockRejectedValue(new Error("Failed to create user"));

        const userEntity: Partial<UserEntity> = {
            samp_username: "John_Doe",
            email: "johndoe@gmail.com",
            ip_address: "127.0.0.1",
            password: "Test$123",
        };

        await expect(userRepository.createUser(userEntity)).rejects.toThrow(
            "Failed to create user"
        );
    });
});
