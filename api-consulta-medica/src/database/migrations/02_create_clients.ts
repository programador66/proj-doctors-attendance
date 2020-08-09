import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("clients", (table) => {
    table.increments("id").primary();
    table.string("nome").notNullable();
    table.string("telefone").notNullable();
    table.string("plano_de_saude").notNullable();

  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("clients");
}
