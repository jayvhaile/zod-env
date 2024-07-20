import {EnvSource} from "../env-source/env-source";
import {z, ZodSchema, ZodTypeAny, infer as zodInfer, ZodObject, ZodError} from "zod";

export class Env<T> {
    private readonly record: T

    private constructor(
        private source: EnvSource,
        private schema: ZodSchema<T>,
    ) {
        try {
            this.record = schema.parse(source.fetch())
        } catch (e) {
            if (e instanceof ZodError) {
                //easier to understand error message
                const map = e.errors.map(err => `==> ${err.path}: ${err.message}`).join('\n')
                throw new Error(`Env validation error: \n${map}`)
            }
            throw e
        }
    }


    static create<S extends EnvRecord>(source: EnvSource, schema: S): Env<inferEnvType<S>> {
        const zodSchema = z.object(schema);
        return new Env(source, zodSchema);
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

export type EnvRecord = Record<string, ZodTypeAny>
export type inferEnvType<S extends EnvRecord> = { [K in keyof S]: S[K]['_type'] }