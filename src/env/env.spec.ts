import {MemoryEnvSource} from "../env-source/sources/memory-env-source";
import {z} from "zod";
import {Env} from "./env";

describe("env.ts tests", () => {

    it("should work when data satisfies schema", () => {
        // Arrange
        const source = new MemoryEnvSource({key: "value"})
        const schema = z.object({
            key: z.string()
        })
        const env = Env.create(source, schema)

        // Act
        const key = env.get("key")

        // Assert
        expect(key).toBe("value")
    })

    it("should throw error if data does not satisfy schema", () => {
        // Arrange
        const source = new MemoryEnvSource({key: 1})
        const schema = z.object({
            key: z.string()
        })

        // Act
        const createEnv = () => Env.create(source, schema)

        // Assert
        expect(createEnv).toThrowError()
    })

    it("should throw if key is not present", () => {
        // Arrange
        const source = new MemoryEnvSource({key: "value"})
        const schema = z.object({
            key: z.string()
        })
        const env = Env.create(source, schema)

        //@ts-ignore
        const getKey = () => env.get("notKey")

        // Assert
        expect(getKey).toThrowError
    })
})