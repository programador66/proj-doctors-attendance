import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("doctors", (table) => {
    table.increments("id").primary();
    table.string("nome").notNullable();
    table.string("especialidade").notNullable();
    table.string("crm").notNullable().unique();

  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("doctors");
}
