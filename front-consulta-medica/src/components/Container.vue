<template>
  <v-container fluid style="width:95%">
    <v-row class="text-center">
      <v-col cols="12" md="8"> <h2>Consultas Marcadas</h2></v-col>
      <v-col cols="12" md="4">
        <img
          src="https://desenvolvimento.agenciadigital.com.vc/wp-content/uploads/2020/03/samel-health-tech-logo-colorida.png"
          alt="samel"
          width="80"
      /></v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" md="8">
        <Table />
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-2" outlined tile>
          <v-btn color="#26C9AD" dark class="btn" @click="dialogMed = true"
            >Adicionar Médico
            <v-icon>mdi-doctor</v-icon>
          </v-btn>
        </v-card>
        <v-card class="pa-2" outlined tile>
          <v-btn
            color="#26C9AD"
            dark
            class="btn"
            @click="dialogAttendance = true"
            >Marcar Consulta
            <v-icon>mdi-hospital-building</v-icon>
          </v-btn>
        </v-card>
        <v-card class="pa-2" outlined tile>
          <v-btn color="#26C9AD" dark class="btn" @click="routerRevenues()"
            >Relatorio
            <v-icon>mdi-file-chart</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogMed" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Cadastro de Médicos(as)</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Nome*"
                  v-model="nomeMedico"
                  required
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="CRM*"
                  v-model="crm"
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Especialidade*"
                  v-model="especialidade"
                  persistent-hint
                  required
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Nomes obrigatórios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialogMed = false"
            >Fechar</v-btn
          >
          <v-btn color="#26C9AD" text @click="handleInsertDoctor">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogAttendance" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Marcar Consultas</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  :items="tpPaciente"
                  label="Selecione o Paciente"
                  outlined
                  @change="handleChoiseClient"
                ></v-select>
              </v-col>
            </v-row>
            <v-row v-if="opPaciente">
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Paciente*"
                  v-model="paciente.nome"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Plano de Saúde"
                  v-model="paciente.plano_de_saude"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Telefone*"
                  v-model="paciente.telefone"
                  persistent-hint
                  v-mask="'(##) ####-####'"
                  hint="(DD) 9999-9999"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="!opPaciente">
              <v-autocomplete
                v-model="selectPaciente"
                :loading="loadingPaciente"
                :items="itemsPaciente"
                :search-input.sync="searchPaciente"
                cache-items
                class="mx-4"
                flat
                hide-no-data
                hide-details
                label="Paciente"
              ></v-autocomplete>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Data"
                  v-model="paciente.data_atendimento"
                  required
                  persistent-hint
                  v-mask="'##/##/####'"
                  hint="DD/MM/AAAA"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Hora"
                  v-model="paciente.hora_atendimento"
                  persistent-hint
                  required
                  v-mask="'##:##'"
                  hint="HH:SS"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-autocomplete
                  v-model="selectMed"
                  :loading="loadingMed"
                  :items="itemsMedicos"
                  :search-input.sync="searchMed"
                  cache-items
                  class="mx-4"
                  flat
                  hide-no-data
                  hide-details
                  label="CRM - Médico"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialogAttendance = false"
            >Fechar</v-btn
          >
          <v-btn color="#26C9AD" @click="handleInsertAttendance" text
            >Agendar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Table from "../components/Table";
import api from "../services/api";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "Container",
  components: { Table },
  data: () => ({
    nameRules: [(v) => !!v || "Campo não pode ser nulo"],
    dialogMed: false,
    dialogAttendance: false,
    nomeMedico: "",
    crm: "",
    especialidade: "",
    tpPaciente: ["Paciente Já Cadastrado", "Novo Paciente"],
    opPaciente: false,
    loadingPaciente: false,
    loadingMed: false,
    itemsMedicos: [],
    itemsPaciente: [],
    searchPaciente: null,
    searchMed: null,
    selectPaciente: null,
    selectMed: null,
    clients: [],
    doctors: [],
    paciente: {
      nome: "",
      telefone: "",
      plano_de_saude: "",
      data_atendimento: "",
      hora_atendimento: "",
    },
  }),
  mounted() {
    this.setAttendanceStore();
    this.getClients();
    this.getDoctors();
  },
  computed: {
    ...mapGetters(["getAttendance"]),
  },
  methods: {
    ...mapMutations(["setAttendance"]),
    routerRevenues() {
      this.$router.push({ path: "/revenues" });
    },
    setAttendanceStore() {
      api
        .getAttendance()
        .then((result) => {
          this.setAttendance(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getClients() {
      api
        .getClients()
        .then((result) => {
          this.clients = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDoctors() {
      api
        .getDoctors()
        .then((result) => {
          this.doctors = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleInsertDoctor() {
      const nomeMedico = this.nomeMedico;
      const crm = this.crm;
      const especialidade = this.especialidade;

      api
        .setDoctors({ nome: nomeMedico, crm, especialidade })
        .then((result) => {
          const mensagem = `${result.data.msg}`;
          this.Helpers.exibirMensagem(mensagem, "green", 3000);

          this.dialogMed = false;
          this.nomeMedico = "";
          this.crm = "";
          this.especialidade = "";
        })
        .catch((e) => {
          const mensagem = `${e.response.data.msg}`;
          this.Helpers.exibirMensagem(mensagem, "red", 3000);
        });
    },
    handleChoiseClient(e) {
      this.opPaciente = e === "Paciente Já Cadastrado" ? false : true;
    },
    querySelections(v) {
      this.loadingPaciente = true;

      setTimeout(() => {
        this.itemsPaciente = this.clients
          .map((paciente) => `${paciente.id} - ${paciente.nome}`)
          .filter((e) => {
            return (
              (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
            );
          });
        this.loadingPaciente = false;
      }, 500);
    },
    querySelectionsMed(v) {
      this.loadingMed = true;

      setTimeout(() => {
        this.itemsMedicos = this.doctors
          .map((med) => `${med.crm} --- ${med.nome}`)
          .filter((e) => {
            return (
              (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
            );
          });
        this.loadingMed = false;
      }, 500);
    },
    handleInsertAttendance() {
      let attendance = {};
      let doctors_id = "";
      if (this.selectMed) {
        let medicos = this.selectMed.split("---");
        let crm = medicos[0].trim();
        let doctors = this.doctors.filter((med) => med.crm === crm);
        doctors_id = doctors[0].id;
      }

      if (this.opPaciente) {
        attendance = {
          newClient: true,
          nome: this.paciente.nome,
          plano_de_saude: this.paciente.plano_de_saude,
          telefone: this.paciente.telefone,
          data_atendimento: this.paciente.data_atendimento,
          hora_atendimento: this.paciente.hora_atendimento,
          doctors_id,
        };
      } else {
        if (this.selectPaciente) {
          let clients = this.selectPaciente.split("-");
          let id = Number(clients[0].trim());

          attendance = {
            newClient: false,
            data_atendimento: this.paciente.data_atendimento,
            hora_atendimento: this.paciente.hora_atendimento,
            doctors_id,
            clients_id: id,
          };
        }
      }
      api
        .setAttendance(attendance)
        .then((result) => {
          const mensagem = `${result.data.msg}`;
          this.Helpers.exibirMensagem(mensagem, "green", 3000);

          this.data_atendimento = "";
          this.hora_atendimento = "";
          this.selectMed = "";
          this.selectPaciente = "";
          this.paciente.nome = "";
          this.paciente.telefone = "";
          this.paciente.plano_de_saude = "";
          this.paciente.hora_atendimento = "";
          this.paciente.data_atendimento = "";
          this.dialogAttendance = false;
          this.setAttendanceStore();
          this.getClients();
        })
        .catch((e) => {
          const mensagem = `${e.response.data.msg}`;
          this.Helpers.exibirMensagem(mensagem, "red", 3000);
        });
    },
  },
  watch: {
    searchPaciente(val) {
      val && val !== this.selectPaciente && this.querySelections(val);
    },
    searchMed(val) {
      val && val !== this.selectMed && this.querySelectionsMed(val);
    },
  },
};
</script>
<style scoped>
.btn {
  width: 100%;
}

h2 {
  color: #21af97;
}
</style>
