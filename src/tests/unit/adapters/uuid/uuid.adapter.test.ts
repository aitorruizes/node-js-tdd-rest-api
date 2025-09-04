import UuidAdapter from "@infrastructure/adapters/uuid/uuid.adapter";
import { describe, expect, it } from "vitest";

type MakeSutReturn = {
    uuidAdapter: UuidAdapter;
};

const makeSut = (): MakeSutReturn => {
    const uuidAdapter = new UuidAdapter();

    return { uuidAdapter };
};

describe("uuid adapter", () => {
    it("should generate an uuid successfully", () => {
        const { uuidAdapter } = makeSut();

        const generatedUuid: string = uuidAdapter.generate_uuid();

        expect(generatedUuid).toBeDefined();
        expect(generatedUuid).toHaveLength(36);
    });
});
