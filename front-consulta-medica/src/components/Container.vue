<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" sm="6" md="8"> <h2>Consultas Marcadas</h2></v-col>
      <v-col cols="6" md="4">
        <img
          src="https://desenvolvimento.agenciadigital.com.vc/wp-content/uploads/2020/03/samel-health-tech-logo-colorida.png"
          alt="samel"
          width="80"
      /></v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" sm="6" md="8">
        <Table />
      </v-col>
      <v-col cols="6" md="4">
        <v-card class="pa-2" outlined tile>
          <v-btn color="#26C9AD" dark class="btn" @click="dialogMed = true"
            >Adicionar Médico
            <v-icon>mdi-doctor</v-icon>
          </v-btn>
        </v-card>
        <v-card class="pa-2" outlined tile>
          <v-btn color="#26C9AD" dark class="btn" @click="dialogAttendance = true"
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
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="CRM*" v-model="crm"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Especialidade*"
                  v-model="especialidade"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Nomes obrigatórios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialogMed = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="handleInsertDoctor"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogAttendance" persistent max-width="700px">
      <v-card>
        <v-card-title>
          <span class="headline">Marcar Consultas</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col  cols="12" sm="6" md="6">
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
                  v-model="nomeMedico"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Plano de Saúde"
                  v-model="especialidade"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
               <v-col cols="12" sm="6" md="4">
                <v-text-field label="Telefone*" v-model="crm"></v-text-field>
              </v-col>
             </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Data"
                  v-model="nomeMedico"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Hora"
                  v-model="especialidade"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" >
                <v-autocomplete
                  :loading="loading"
                  :items="items"
                  :search-input.sync="search"
                  cache-items
                  class="mx-4"
                  flat
                  hide-no-data
                  hide-details
                  label="Médico"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialogAttendance = false"
            >Close</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
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
    dialogMed: false,
    dialogAttendance: false,
    nomeMedico: "",
    crm: "",
    especialidade: "",
    tpPaciente: ["Paciente Já Cadastrado", "Novo Paciente"],
    opPaciente: false,
    modelo: "",
    loading: false,
    items: [],
    search: null,
    select: null,
    carroRetirado: false,
    payment: "pagamento",
    valor: "0",
  }),
  mounted() {
    this.setAttendanceStore();
  },
  computed: {
    ...mapGetters(["getAttendance"]),
  },
  methods: {
    routerRevenues() {
      this.$router.push({ path: "/revenues" });
    },
    ...mapMutations(["setAttendance"]),
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
      handleInsertDoctor() {
        const nomeMedico = this.nomeMedico;
        const crm = this.crm;
        const especialidade = this.especialidade;

        api
          .setDoctors({ nome:nomeMedico, crm, especialidade })
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
      handleChoiseClient(e){
      this.opPaciente =  e === "Paciente Já Cadastrado" ? false : true;
  
      },
    //   handlePayment() {
    //     const { id, placa } = this.getAttendance.filter(
    //       (car) => car.placa === this.placaSaida
    //     )[0];

    //     api
    //       .setPayment({ cars_id: id, placa })
    //       .then((result) => {
    //         this.carroRetirado = true;
    //         this.payment = `${result.data.msg} ás ${result.data.hora}`;
    //         this.valor = result.data.total_a_pagar;
    //       })
    //       .catch((e) => {
    //         const mensagem = `${e.response.data.msg}`;
    //         this.Helpers.exibirMensagem(mensagem, "red", 3000);
    //       });
    //   },
    //   handleSetStatusCarroRetirado() {
    //     this.carroRetirado = false;
    //     this.dialogCarSaida = false;
    //     this.placaSaida = "";
    //     this.setAttendanceStore();
    //   },
    //   querySelections(v) {
    //     this.loading = true;

    //     setTimeout(() => {
    //       this.items = this.getAttendance
    //         .map((att) => att.paciente)
    //         .filter((e) => {
    //           return (
    //             (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
    //           );
    //         });
    //       this.loading = false;
    //     }, 500);
    //   },
    // },
    // watch: {
    //   search(val) {
    //     val && val !== this.select && this.querySelections(val);
    //   },
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
