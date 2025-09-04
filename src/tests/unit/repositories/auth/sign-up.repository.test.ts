import type { UserGatewayPort } from "@application/ports/user/user-gateway.port";
import type { UserEntity } from "@domain/entities/user/user.entity";
import UserRepository from "@infrastructure/repositories/auth/sign-up.repository";
import { describe, expect, it, type Mock, vi } from "vitest";

type MakeSutReturn = {
    userRepository: UserRepository;
    insertUserMock: Mock;
    userEntityMock: Partial<UserEntity>;
};

const makeSut = (): MakeSutReturn => {
    const userEntityMock: Partial<UserEntity> = {
        id: "1",
        samp_username: "John_Doe",
        email: "johndoe@gmail.com",
    };

    const insertUserMock: Mock = vi.fn().mockResolvedValue(userEntityMock);

    const userGatewayMock: UserGatewayPort = {
        insertUser: insertUserMock,
    } as UserGatewayPort;

    const userRepository: UserRepository = new UserRepository(userGatewayMock);

    return { userRepository, insertUserMock, userEntityMock };
};

describe("user repository", () => {
    it("should create a new user successfully", async () => {
        const { userRepository, insertUserMock, userEntityMock } = makeSut();

        const userEntity: Partial<UserEntity> = {
            samp_username: "John_Doe",
            email: "johndoe@gmail.com",
            ip_address: "127.0.0.1",
            password: "Test$123",
        };

        const result: Partial<UserEntity> =
            await userRepository.execute(userEntity);

        expect(result).toBeDefined();
        expect(result).toEqual(userEntityMock);
        expect(insertUserMock).toHaveBeenCalledTimes(1);
        expect(insertUserMock).toHaveBeenCalledWith(userEntity);
    });

    it("should throw error when execute fails", async () => {
        const { userRepository, insertUserMock } = makeSut();

        insertUserMock.mockRejectedValue(new Error("Failed to create user"));

        const userEntity: Partial<UserEntity> = {
            samp_username: "John_Doe",
            email: "johndoe@gmail.com",
            ip_address: "127.0.0.1",
            password: "Test$123",
        };

        await expect(userRepository.execute(userEntity)).rejects.toThrow(
            "Failed to create user",
        );
    });
});
