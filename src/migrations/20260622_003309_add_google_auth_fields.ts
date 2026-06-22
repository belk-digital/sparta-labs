import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN CREATE TYPE "public"."enum_users_auth_provider" AS ENUM('email', 'google'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "google_id" varchar;
  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "auth_provider" "enum_users_auth_provider" DEFAULT 'email';
  CREATE UNIQUE INDEX IF NOT EXISTS "users_google_id_idx" ON "users" USING btree ("google_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "users_google_id_idx";
  ALTER TABLE "users" DROP COLUMN "google_id";
  ALTER TABLE "users" DROP COLUMN "auth_provider";
  DROP TYPE "public"."enum_users_auth_provider";`)
}
