import type { UuidGenerationPort } from "@application/ports/uuid/uuid-generation.port";
import { v4 as uuidv4 } from "uuid";

export default class UuidAdapter implements UuidGenerationPort {
    public generate_uuid(): string {
        return uuidv4();
    }
}
