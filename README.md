# @jvhaile/zod-env

A TypeScript library for handling environment variables in a typesafe manner using Zod schemas.

## Features

- **Type Safety**: Define environment variable schemas with Zod and ensure type safety throughout your application.
- **Multiple Sources**: Support for different environment variable sources like Node process environment, `.env` files,
  in-memory records, and custom sources.
- **Detailed Validation**: Provides detailed validation errors for misconfigured environment variables.
- **Ease of Use**: Access environment variables directly without needing to call getter methods.

## Installation

```bash
npm install @jvhaile/zod-env
```

## Usage

### Define a Schema and Create the Environment Configuration

First, create an `env.ts` file where you define your schema and environment configuration:

```typescript
// env.ts
import {z} from "zod";
import {createEnv} from "@jvhaile/zod-env";

// Create the environment configuration
export const env = createEnv(
    {source: 'node'},
    {
        PORT: z.string().regex(/^\d+$/),
        NODE_ENV: z.enum(["development", "production"]),
    }
);

// Other options: 
// export const env = createEnv({ source: 'memory', record: { PORT: "3000", NODE_ENV: "development" } }, { ...schema });
// export const env = createEnv({ source: 'dotenv' }, { ...schema });
// export const env = createEnv({ source: 'custom', fetch: () => ({ PORT: "3000", NODE_ENV: "development" }) }, { ...schema });
```

### Fetch Environment Variables

You can now use the `env` object to access your environment variables directly:

```typescript
// Example usage in your application
import {env} from "./env";

console.log(env.PORT); // e.g., "3000"
console.log(env.NODE_ENV); // e.g., "development"
```

### Alternate Direct Functions

You can also use the provided direct functions to create environment configurations from different sources:

#### Node Process Environment

Fetch environment variables from `process.env`.

```typescript
import {nodeProcessEnv} from "@jvhaile/zod-env";
import {z} from "zod";

const env = nodeProcessEnv({
    PORT: z.string().regex(/^\d+$/),
    NODE_ENV: z.enum(["development", "production"]),
});

console.log(env.PORT); // e.g., "3000"
console.log(env.NODE_ENV); // e.g., "development"
```

#### .env File

Fetch environment variables from a `.env` file.

```typescript
import {dotEnv} from "@jvhaile/zod-env";
import {z} from "zod";

const env = dotEnv({
    PORT: z.string().regex(/^\d+$/),
    NODE_ENV: z.enum(["development", "production"]),
});

console.log(env.PORT); // e.g., "3000"
console.log(env.NODE_ENV); // e.g., "development"
```

#### In-Memory Record

Fetch environment variables from an in-memory record.

```typescript
import {memoryEnv} from "@jvhaile/zod-env";
import {z} from "zod";

const env = memoryEnv({
    PORT: z.string().regex(/^\d+$/),
    NODE_ENV: z.enum(["development", "production"]),
}, {PORT: "3000", NODE_ENV: "development"});

console.log(env.PORT); // e.g., "3000"
console.log(env.NODE_ENV); // e.g., "development"
```

#### Custom Source

Fetch environment variables from a custom source.

```typescript
import {customEnv} from "@jvhaile/zod-env";
import {z} from "zod";

const customFetch = () => {
    // Custom logic to fetch environment variables
    return {
        PORT: "3000",
        NODE_ENV: "development",
    };
};

const env = customEnv(customFetch, {
    PORT: z.string().regex(/^\d+$/),
    NODE_ENV: z.enum(["development", "production"]),
});

console.log(env.PORT); // e.g., "3000"
console.log(env.NODE_ENV); // e.g., "development"
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.