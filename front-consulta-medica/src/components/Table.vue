<template>
  <v-card>
    <v-card-title style="color:#21AF97">
      Consultas do dia
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="getAttendance"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Table",

  data: () => ({
    search: "",
    headers: [
      {
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Paciente", value: "paciente" },
      { text: "Plano de Saude", value: "plano_de_saude" },
      { text: "Telefone", value: "telefone" },
      { text: "Médico(a)", value: "medico" },
      { text: "Especialidade", value: "especialidade" },
      { text: "Hora Atendimento", value: "hora_atendimento" },
      { text: "Data Atendimento", value: "data_atendimento" },
    ],
    carros: [],
  }),
  computed: {
    ...mapGetters(["getAttendance"]),
  },
};
</script>
