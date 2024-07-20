import {EnvSource} from "../env-source";

export class MemoryEnvSource implements EnvSource {
    constructor(private readonly record: Record<string, any>) {
    }

    fetch() {
        return this.record
    }
}