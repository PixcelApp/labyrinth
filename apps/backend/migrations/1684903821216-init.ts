import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1684903821216 implements MigrationInterface {
    name = 'Init1684903821216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "entity_model" ("id" character varying NOT NULL, CONSTRAINT "PK_ea7e5d0ca6a0d6221f78cea499a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_model_type_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "user_model" ("id" character varying NOT NULL, "username" character varying NOT NULL, "nickname" text NOT NULL, "type" "public"."user_model_type_enum" NOT NULL, CONSTRAINT "UQ_180abb555e21d4825693f11b94d" UNIQUE ("username"), CONSTRAINT "PK_7d6bfa71f4d6a1fa0af1f688327" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_model"`);
        await queryRunner.query(`DROP TYPE "public"."user_model_type_enum"`);
        await queryRunner.query(`DROP TABLE "entity_model"`);
    }

}
