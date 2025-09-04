import BcryptAdapter, {
    BCRPYT_DEFAULT_COST,
} from "@infrastructure/adapters/bcrypt/bcrypt.adapter";
import bcryptjs from "bcryptjs";
import { afterEach, describe, expect, it, type MockInstance, vi } from "vitest";

type MakeSutReturn = {
    bcryptAdapter: BcryptAdapter;
    bcryptHashSpy: MockInstance;
    bcryptCompareSpy: MockInstance;
};

const makeSut = (): MakeSutReturn => {
    const bcryptAdapter: BcryptAdapter = new BcryptAdapter();
    const bcryptHashSpy: MockInstance = vi.spyOn(bcryptjs, "hash");
    const bcryptCompareSpy: MockInstance = vi.spyOn(bcryptjs, "compare");

    return { bcryptAdapter, bcryptHashSpy, bcryptCompareSpy };
};

describe("bcrypt adapter", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should hash a value successfully", async () => {
        const { bcryptAdapter } = makeSut();
        const valueToHash: string = "random text";
        const hashed_value: string = await bcryptAdapter.hash(valueToHash);

        expect(hashed_value).toBeDefined();
        expect(hashed_value).not.toEqual(valueToHash);
    });

    it("should throw if bcrypt.hash throws", async () => {
        const { bcryptAdapter, bcryptHashSpy } = makeSut();

        bcryptHashSpy.mockRejectedValue(new Error("hash error"));

        const result: Promise<string> = bcryptAdapter.hash("any_value");

        await expect(result).rejects.toThrow("hash error");

        expect(bcryptHashSpy).toHaveBeenCalledTimes(1);

        expect(bcryptHashSpy).toHaveBeenCalledWith(
            "any_value",
            BCRPYT_DEFAULT_COST,
        );
    });

    it("should return true if compares a valid password and hash", async () => {
        const { bcryptAdapter } = makeSut();
        const password: string = "StrongPassword123";

        const passwordHash: string =
            "$2a$12$DEZ8fbQyAuqV/s2rR6CLEu9DHXD10XgPf/iBc5JvExS2788Gm8B0q";

        const result: boolean = await bcryptAdapter.compare(
            password,
            passwordHash,
        );

        expect(result).toBeTruthy();
    });

    it("should return false if compares a valid password and hash", async () => {
        const { bcryptAdapter } = makeSut();
        const password: string = "StrongPassword1234";

        const passwordHash: string =
            "$2a$12$DEZ8fbQyAuqV/s2rR6CLEu9DHXD10XgPf/iBc5JvExS2788Gm8B0q";

        const result: boolean = await bcryptAdapter.compare(
            password,
            passwordHash,
        );

        expect(result).toBeFalsy();
    });

    it("should throw if bcrypt.compare throws", async () => {
        const { bcryptAdapter, bcryptCompareSpy } = makeSut();
        const password: string = "StrongPassword123";

        const passwordHash: string =
            "$2a$12$DEZ8fbQyAuqV/s2rR6CLEu9DHXD10XgPf/iBc5JvExS2788Gm8B0q";

        bcryptCompareSpy.mockRejectedValue(new Error("compare error"));

        const result: Promise<boolean> = bcryptAdapter.compare(
            password,
            passwordHash,
        );

        await expect(result).rejects.toThrow("compare error");

        expect(bcryptCompareSpy).toHaveBeenCalledTimes(1);
        expect(bcryptCompareSpy).toHaveBeenCalledWith(password, passwordHash);
    });
});
