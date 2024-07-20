# @jvhaile/zod-env

A TypeScript library for handling environment variables in a typesafe manner using Zod schemas.

## Features

- **Type Safety**: Define environment variable schemas with Zod and ensure type safety throughout your application.
- **Multiple Sources**: Support for different environment variable sources like Node process environment, `.env` files, and in-memory records.
- **Detailed Validation**: Provides detailed validation errors for misconfigured environment variables.
- **Ease of Use**: Simple API for fetching and using environment variables.

## Installation

```bash
npm install @jvhaile/zod-env
```

## Usage

### Define a Schema

First, define a Zod schema for your environment variables.

```typescript
import { z } from "zod";

const schema = z.object({
    PORT: z.string().regex(/^\d+$/),
    NODE_ENV: z.enum(["development", "production"]),
});
```

### Fetch Environment Variables

You can fetch environment variables from different sources.

#### Node Process Environment

Fetch environment variables from `process.env`.

```typescript
import { nodeProcessEnv } from "@jvhaile/zod-env";

const env = nodeProcessEnv(schema);

console.log(env.get("PORT")); // e.g., "3000"
console.log(env.get("NODE_ENV")); // e.g., "development"
```

#### .env File

Fetch environment variables from a `.env` file.

```typescript
import { dotEnv } from "@jvhaile/zod-env";

const env = dotEnv('.env', schema);

console.log(env.get("PORT")); // e.g., "3000"
console.log(env.get("NODE_ENV")); // e.g., "development"
```

#### In-Memory Record

Fetch environment variables from an in-memory record.

```typescript
import { memoryEnv } from "@jvhaile/zod-env";

const env = memoryEnv(schema, { PORT: "3000", NODE_ENV: "development" });

console.log(env.get("PORT")); // e.g., "3000"
console.log(env.get("NODE_ENV")); // e.g., "development"
```

## API

### `nodeProcessEnv<T>(schema: ZodSchema<T>): Env<T>`

Fetch environment variables from the Node process environment.

### `memoryEnv<T>(schema: ZodSchema<T>, record: Record<string, any>): Env<T>`

Fetch environment variables from an in-memory record.

### `dotEnv<T>(path: string, schema: ZodSchema<T>): Env<T>`

Fetch environment variables from a `.env` file.

### `Env<T>`

#### `get<K extends keyof T>(key: K): T[K]`

Fetch the value of an environment variable. Throws an error if the key is not found.

#### `getRecord(): T`

Get the entire record of environment variables.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.