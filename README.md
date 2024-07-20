# @jvhaile/zod-env

A TypeScript library for handling environment variables in a typesafe manner using Zod schemas.

## Features

- **Type Safety**: Define environment variable schemas with Zod and ensure type safety throughout your application.
- **Multiple Sources**: Support for different environment variable sources like Node process environment, `.env` files, in-memory records, and custom sources.
- **Detailed Validation**: Provides detailed validation errors for misconfigured environment variables.
- **Ease of Use**: Simple API for fetching and using environment variables.

## Installation

```bash
npm install @jvhaile/zod-env
```

## Usage

### Define a Schema and Create the Environment Configuration

First, create an `env.ts` file where you define your schema and environment configuration:

```typescript
// env.ts
import { z } from "zod";
import { createEnv } from "@jvhaile/zod-env";

// Create the environment configuration
export const env = createEnv({ source: 'node' }, {
    PORT: z.string().regex(/^\d+$/),
    NODE_ENV: z.enum(["development", "production"]),
});

// Other options: 
// export const env = createEnv({ source: 'memory', record: { PORT: "3000", NODE_ENV: "development" } }, { ...schema });
// export const env = createEnv({ source: 'dotenv', path: '.env' }, { ...schema });
// export const env = createEnv({ source: 'custom', fetch: () => ({ PORT: "3000", NODE_ENV: "development" }) }, { ...schema });
```

### Fetch Environment Variables

You can now use the `env` object to access your environment variables throughout your application:

```typescript
// Example usage in your application
import { env } from "./env";

console.log(env.get("PORT")); // e.g., "3000"
console.log(env.get("NODE_ENV")); // e.g., "development"
```

## API

### `createEnv<T extends EnvRecord>(option: SourceOption, schema: T): Env<inferEnvType<T>>`

Fetch environment variables from a specified source (node, memory, dotenv, custom) and validate them against the provided schema.

#### SourceOption

```typescript
type SourceOption =
    | { source: 'node' }
    | { source: 'memory', record: Record<string, string> }
    | { source: 'dotenv', path?: string }
    | { source: 'custom', fetch: () => Record<string, string> }
```

### `Env<T>`

#### `get<K extends keyof T>(key: K): T[K]`

Fetch the value of an environment variable. Throws an error if the key is not found.

#### `getRecord(): T`

Get the entire record of environment variables.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.