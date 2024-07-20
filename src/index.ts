import {Env, EnvRecord, inferEnvType} from "./env/env";
import {NodeProcessEnvSource} from "./env-source/sources/node-process-env-source";
import {MemoryEnvSource} from "./env-source/sources/memory-env-source";
import {DotEnvFileSource} from "./env-source/sources/dot-env-file-source";

export function nodeProcessEnv<T extends EnvRecord>(schema: T): inferEnvType<T> {
    return Env.create(new NodeProcessEnvSource(), schema).getRecord()
}

export function memoryEnv<T extends EnvRecord>(schema: T, record: Record<string, any>): inferEnvType<T> {
    return Env.create(new MemoryEnvSource(record), schema).getRecord()
}

export function dotEnv<T extends EnvRecord>(path: string, schema: T): inferEnvType<T> {
    return Env.create(new DotEnvFileSource(path), schema).getRecord()
}



export function createEnv<T extends EnvRecord>(source: SourceOption, schema: T): inferEnvType<T> {
    switch (source.source) {
        case "memory":
            return memoryEnv(schema, source.record)
        case "node":
            return nodeProcessEnv(schema)
        case "dotenv":
            return dotEnv(source.path || '.env', schema)
        case "custom":
            return Env.create({fetch: source.fetch}, schema).getRecord()
    }
}

type SourceOption =
    | { source: 'node' }
    | { source: 'memory', record: Record<string, string> }
    | { source: 'dotenv', path?: string }
    | { source: 'custom', fetch: () => Record<string, string> } 