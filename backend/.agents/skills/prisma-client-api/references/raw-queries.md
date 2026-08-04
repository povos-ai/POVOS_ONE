# Raw Queries

Execute raw SQL when Prisma's query API isn't sufficient.

## $queryRaw

Execute SELECT queries and get typed results:

```typescript
const users = await prisma.$queryRaw`
  SELECT * FROM "user" WHERE email LIKE ${'%@prisma.io'}
`
```

### With type

```typescript
type user = { id: number; email: string; name: string | null }

const users = await prisma.$queryRaw<user[]>`
  SELECT id, email, name FROM "user" WHERE role = ${'ADMIN'}
`
```

### Dynamic table/column names

Use `Prisma.raw()` for identifiers (not safe for user input):

```typescript
import { Prisma } from '../generated/client'

const column = 'email'
const users = await prisma.$queryRaw`
  SELECT ${Prisma.raw(column)} FROM "user"
`
```

### With Prisma.sql

Build queries dynamically:

```typescript
import { Prisma } from '../generated/client'

const email = 'alice@prisma.io'
const query = Prisma.sql`SELECT * FROM "user" WHERE email = ${email}`
const users = await prisma.$queryRaw(query)
```

### Join multiple SQL fragments

```typescript
import { Prisma } from '../generated/client'

const conditions = [
  Prisma.sql`role = ${'ADMIN'}`,
  Prisma.sql`verified = ${true}`
]

const users = await prisma.$queryRaw`
  SELECT * FROM "user" 
  WHERE ${Prisma.join(conditions, ' AND ')}
`
```

## $executeRaw

Execute INSERT, UPDATE, DELETE (returns affected count):

```typescript
const count = await prisma.$executeRaw`
  UPDATE "user" SET verified = true WHERE email LIKE ${'%@prisma.io'}
`
console.log(`Updated ${count} users`)
```

### Delete example

```typescript
const deleted = await prisma.$executeRaw`
  DELETE FROM "user" WHERE "deletedAt" < ${thirtyDaysAgo}
`
```

### Insert example

```typescript
const inserted = await prisma.$executeRaw`
  INSERT INTO "Log" (message, level, timestamp)
  VALUES (${message}, ${level}, ${new Date()})
`
```

## $queryRawUnsafe / $executeRawUnsafe

For fully dynamic queries (use with caution!):

```typescript
// ⚠️ SQL injection risk - only use with trusted input
const table = 'user'
const users = await prisma.$queryRawUnsafe(
  `SELECT * FROM "${table}" WHERE id = $1`,
  userId
)
```

### Parameterized unsafe query

```typescript
const result = await prisma.$executeRawUnsafe(
  'UPDATE "user" SET name = $1 WHERE id = $2',
  'Alice',
  1
)
```

## SQL Injection Prevention

### Safe (parameterized)

```typescript
// ✅ user input is parameterized
const email = userInput
const users = await prisma.$queryRaw`
  SELECT * FROM "user" WHERE email = ${email}
`
```

### Unsafe (concatenation)

```typescript
// ❌ SQL injection vulnerability!
const email = userInput
const users = await prisma.$queryRawUnsafe(
  `SELECT * FROM "user" WHERE email = '${email}'`
)
```

## Database-Specific Features

### PostgreSQL

```typescript
// Array operations
const users = await prisma.$queryRaw`
  SELECT * FROM "user" WHERE 'admin' = ANY(roles)
`

// JSON operations
const users = await prisma.$queryRaw`
  SELECT * FROM "user" WHERE metadata->>'theme' = 'dark'
`
```

### MySQL

```typescript
// Full-text search
const posts = await prisma.$queryRaw`
  SELECT * FROM Post WHERE MATCH(title, content) AGAINST(${searchTerm})
`
```

## Transactions with Raw Queries

```typescript
await prisma.$transaction(async (tx) => {
  await tx.$executeRaw`UPDATE "Account" SET balance = balance - ${amount} WHERE id = ${senderId}`
  await tx.$executeRaw`UPDATE "Account" SET balance = balance + ${amount} WHERE id = ${recipientId}`
})
```

## Handling Results

### BigInt handling

PostgreSQL returns BigInt for COUNT:

```typescript
const result = await prisma.$queryRaw<[{ count: bigint }]>`
  SELECT COUNT(*) as count FROM "user"
`
const count = Number(result[0].count)
```

### Date handling

```typescript
type Result = { createdAt: Date }
const users = await prisma.$queryRaw<Result[]>`
  SELECT "createdAt" FROM "user"
`
// createdAt is already a Date object
```
