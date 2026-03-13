---
title: "TypeScript Avançado: Patterns que Todo Sênior Deveria Conhecer"
slug: "typescript-patterns-senior"
date: "2026-02-28"
category: "Desenvolvimento"
excerpt: "Deep dive em patterns avançados de TypeScript que elevam a qualidade e type-safety do seu código."
author: "TechHub Team"
coverImage: "/images/blog/typescript.jpg"
published: true
---

# TypeScript Avançado: Patterns que Todo Sênior Deveria Conhecer

TypeScript evoluiu muito além de simples type annotations. Hoje, o sistema de tipos é uma linguagem completa dentro da linguagem, permitindo expressar invariantes de negócio e padrões arquiteturais diretamente nos tipos.

## Utility Types Avançados

Além dos básicos (`Partial`, `Required`, `Pick`), existem utilities que resolvem problemas comuns:

### TypeScript 5.5+ `Awaited`

```typescript
type AsyncReturnType<T> = T extends (...args: any[]) => Promise<infer R>
  ? Awaited<R>
  : never;

async function fetchData() {
  return { id: 1, name: 'TechHub' };
}

type Data = AsyncReturnType<typeof fetchData>;
// { id: number; name: string; }
```

### `NoInfer` para APIs Estritas

```typescript
function createState<T>(initial: T, noInfer: NoInfer<T> = initial) {
  return {
    get: () => initial,
    set: (value: NoInfer<T>) => { /* ... */ }
  };
}

const state = createState({ count: 0 });
state.set({ count: 1 }); // ✅ OK
state.set({ count: '1' }); // ❌ Error
```

## Discriminated Unions

O pattern mais poderoso para modelar estados:

```typescript
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

function handleResult<T>(result: Result<T>) {
  if (result.success) {
    console.log(result.data); // TypeScript knows this is T
  } else {
    console.error(result.error); // TypeScript knows this is E
  }
}
```

### Com Actions para Reducers

```typescript
type Action =
  | { type: 'INCREMENT'; payload: number }
  | { type: 'DECREMENT'; payload: number }
  | { type: 'RESET' };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.payload;
    case 'DECREMENT':
      return state - action.payload;
    case 'RESET':
      return 0;
  }
}
```

## Template Literal Types

Criando tipos baseados em strings:

```typescript
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type Route<Path extends string> = {
  path: Path;
  method: HttpMethod;
  handler: () => void;
};

// Extraindo parâmetros de rotas
type ExtractParams<Path extends string> = 
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractParams<`/${Rest}`>
    : Path extends `${string}:${infer Param}`
    ? Param
    : never;

type UserParams = ExtractParams<'/users/:id/posts/:postId'>;
// 'id' | 'postId'
```

## Const Type Parameters

TypeScript 5.0+ introduziu `const` type parameters:

```typescript
function createTuple<const T extends readonly string[]>(items: T) {
  return items;
}

const tuple = createTuple(['a', 'b', 'c'] as const);
// type is readonly ['a', 'b', 'c']
```

## Mapped Types Avançados

### Key Remapping

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface User {
  id: number;
  name: string;
  email: string;
}

type UserGetters = Getters<User>;
// {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
// }
```

### Conditional Types Com Mapped

```typescript
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

interface Config {
  debug: boolean;
  port: number;
  host: string;
  retries: number;
}

type NumbersOnly = PickByType<Config, number>;
// { port: number; retries: number; }
```

## Brand Types para Type-Safety

Criando tipos nominalmente diferentes:

```typescript
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<number, 'UserId'>;
type PostId = Brand<number, 'PostId'>;

function getUser(id: UserId) { /* ... */ }
function getPost(id: PostId) { /* ... */ }

const userId = 1 as UserId;
const postId = 1 as PostId;

getUser(userId); // ✅
getUser(postId); // ❌ Error!
```

## Infer em Condicionais

Extraindo tipos de estruturas complexas:

```typescript
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type ArrayElement<T> = T extends (infer E)[] ? E : never;
type FunctionParams<T> = T extends (...args: infer P) => any ? P : never;

// Uso prático
type AsyncData = UnwrapPromise<Promise<string>>; // string
type Element = ArrayElement<number[]>; // number
type Params = FunctionParams<(a: string, b: number) => void>; // [string, number]
```

## Conclusão

TypeScript avançado não é sobre criar tipos complexos por complexidade. É sobre expressar invariantes de negócio, tornar estados impossíveis inrepresentáveis e criar APIs que guiam desenvolvedores para o uso correto.

O investimento em dominar esses patterns paga dividendos em código mais seguro, refatorações mais confiáveis e melhor DX para toda a equipe.

---

*Quer dominar TypeScript? Confira nosso [curso completo](/produtos) e junte-se à [comunidade](/comunidade) para discussões avançadas.*
