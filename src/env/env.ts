import {EnvSource} from "../env-source/env-source";
import {ZodSchema} from "zod";

export class Env<T> {
    private readonly record: T

    private constructor(
        private source: EnvSource,
        private schema: ZodSchema<T>,
    ) {
        this.record = schema.parse(source.fetch())
    }


    static create<T>(source: EnvSource, schema: ZodSchema<T>) {
        return new Env(source, schema)
    }

    get<K extends keyof T>(key: K): T[K] {
        const value = this.record[key]
        if (value === undefined) {
            throw new Error(`Key ${key.toString()} not found`)
        }
        return value
    }

    getRecord(): T {
        return this.record
    }
}