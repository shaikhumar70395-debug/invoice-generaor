import 'dotenv/config';
import { createClient } from '@libsql/client';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';

async function main() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

  if (!url || url.startsWith('file:')) {
    console.log('Skipping remote migration: DATABASE_URL is not set to a remote libsql/turso database.');
    return;
  }

  console.log(`Connecting to remote database: ${url}...`);
  const client = createClient({ url, authToken });

  // Read migrations directory
  const migrationsDir = join(process.cwd(), 'prisma', 'migrations');
  const items = await fs.readdir(migrationsDir, { withFileTypes: true });
  
  // Get all migration directories sorted chronologically
  const migrationDirs = items
    .filter(item => item.isDirectory())
    .map(item => item.name)
    .sort();

  console.log(`Found ${migrationDirs.length} migrations to apply.`);

  // Create migrations log table if not exists
  await client.execute(`
    CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
      "id" TEXT PRIMARY KEY,
      "checksum" TEXT NOT NULL,
      "finished_at" DATETIME,
      "migration_name" TEXT NOT NULL,
      "logs" TEXT,
      "rolled_back_at" DATETIME,
      "started_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
      "applied_steps_count" INTEGER DEFAULT 0
    );
  `);

  for (const dirName of migrationDirs) {
    const migrationFile = join(migrationsDir, dirName, 'migration.sql');
    try {
      const sql = await fs.readFile(migrationFile, 'utf8');
      
      // Check if migration already applied
      const check = await client.execute({
        sql: 'SELECT id FROM "_prisma_migrations" WHERE migration_name = ?',
        args: [dirName]
      });

      if (check.rows.length > 0) {
        console.log(`Migration ${dirName} is already applied. Skipping.`);
        continue;
      }

      console.log(`Applying migration ${dirName}...`);

      // Execute DDL statements one by one.
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      for (const statement of statements) {
        await client.execute(statement);
      }

      // Record migration success
      await client.execute({
        sql: 'INSERT INTO "_prisma_migrations" (id, checksum, finished_at, migration_name) VALUES (?, ?, CURRENT_TIMESTAMP, ?)',
        args: [dirName, 'sha256', dirName]
      });

      console.log(`✓ Migration ${dirName} applied successfully.`);
    } catch (err) {
      console.error(`Error applying migration ${dirName}:`, err);
      process.exit(1);
    }
  }

  console.log('🎉 All remote migrations applied successfully.');
  client.close();
}

main().catch(console.error);
