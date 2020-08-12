<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="12">
        <h2><strong> Relatório De Consultas</strong></h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="2">
        <v-text-field
          v-model="data_inicial"
          label="Data Inicial"
          outlined
          dense
          autofocus
          v-mask="'##/##/####'"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field
          v-model="data_final"
          label="Data Final"
          outlined
          dense
          v-mask="'##/##/####'"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-btn
          depressed
          large
          color="#26C9AD"
          dark
          dense
          @click="generateReport"
          >Relatório</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" sm="6" md="12">
        <v-card>
          <v-card-title>
            Relatório de Período
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
            :items="relatorio"
            :search="search"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../services/api";

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
    data_inicial: "",
    data_final: "",
    total: "",
    relatorio: [],
  }),

  methods: {
    generateReport() {
      const data_inicial = this.data_inicial;
      const data_final = this.data_final;

      api
        .getReport({ data_inicial, data_final })
        .then((result) => {
          const res = result.data.data;
          if (res.length) {
            this.relatorio = result.data.data;
          } else {
            this.Helpers.exibirMensagem(
              "Não há dados encontrado para o período informado",
              "orange",
              3000
            );
          }
        })
        .catch((e) => {
          const mensagem = `${e.response.data.msg}`;
          this.Helpers.exibirMensagem(mensagem, "red", 3000);
        });
    },
  },
};
</script>

<style>
h2 {
  color: #26c9ad;
}
</style>
