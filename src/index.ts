import {ZodSchema} from "zod";
import {Env} from "./env/env";
import {NodeProcessEnvSource} from "./env-source/sources/node-process-env-source";
import {MemoryEnvSource} from "./env-source/sources/memory-env-source";
import {DotEnvFileSource} from "./env-source/sources/dot-env-file-source";

export function nodeProcessEnv<T>(schema: ZodSchema<T>): Env<T> {
    return Env.create(new NodeProcessEnvSource(), schema)
}

export function memoryEnv<T>(schema: ZodSchema<T>, record: Record<string, any>): Env<T> {
    return Env.create(new MemoryEnvSource(record), schema)
}

export function dotEnv<T>(path: string, schema: ZodSchema<T>): Env<T> {
    return Env.create(new DotEnvFileSource(path), schema)
}