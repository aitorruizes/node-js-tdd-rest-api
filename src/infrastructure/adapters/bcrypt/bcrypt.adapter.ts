import type { HasherPort } from "@application/ports/hasher/hasher.port";
import bcryptjs from "bcryptjs";

export const BCRPYT_DEFAULT_COST: number = 12;

export default class BcryptAdapter implements HasherPort {
    public async hash(value: string): Promise<string> {
        try {
            return await bcryptjs.hash(value, BCRPYT_DEFAULT_COST);
        } catch (err: unknown) {
            console.error(err);

            throw err;
        }
    }

    public async compare(
        password: string,
        passwordHash: string,
    ): Promise<boolean> {
        try {
            return await bcryptjs.compare(password, passwordHash);
        } catch (err: unknown) {
            console.error(err);

            throw err;
        }
    }
}
