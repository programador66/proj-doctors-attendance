import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("attendance", (table) => {
    table.increments("id").primary();
    table.time("hora_atendimento").notNullable();
    table.date("data_atendimento");
    table.integer("doctors_id").notNullable().references("id").inTable("doctors");
    table.integer("clients_id").notNullable().references("id").inTable("clients");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("attendance");
}
