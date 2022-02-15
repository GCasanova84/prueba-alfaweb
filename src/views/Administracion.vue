<template>
  <div>
    <div class="d-flex align-center justify-center mt-8">
      <span class="text-h2 mr-2">Administración</span>
      <admin-modal />
    </div>
    <div class="py-10 px-16">
      <admin-table />
      <v-chip
        v-for="(chip, index) in chips"
        :key="index"
        class="mt-4"
        :color="chip.color"
        label
        outlined
        style="width: 100%"
      >
        <span>
          <v-icon small class="mr-2">{{ chip.icon }}</v-icon
          >{{ chip.textA }}<strong>{{ chip.textStrong }}</strong
          >{{ chip.textB }}
        </span>
      </v-chip>
    </div>
  </div>
</template>

<script>
import AdminTable from "../components/AdminTable.vue";
import AdminModal from "../components/AdminModal.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    AdminTable,
    AdminModal,
  },
  computed: {
    ...mapGetters([
      "totalCupos",
      "totalInscritos",
      "cursosTerminados",
      "cursosActivos",
    ]),
    chips() {
      return [
        {
          color: "purple",
          icon: "mdi-account-group",
          textA: " Cantidad total de alumnos permitidos: ",
          textStrong: this.totalCupos,
          textB: " alumnos",
        },
        {
          color: "blue darken-1",
          icon: "mdi-account-multiple-check",
          textA: " Cantidad total de alumnos inscritos: ",
          textStrong: this.totalInscritos,
          textB: " alumnos",
        },
        {
          color: "red darken-1",
          icon: "mdi-account-clock",
          textA: " Cantidad total de cupos restantes: ",
          textStrong: this.totalCupos - this.totalInscritos,
          textB: " alumnos",
        },
        {
          color: "pink",
          icon: "mdi-cancel",
          textA: " Cantidad total de cursos terminados: ",
          textStrong: this.cursosTerminados,
          textB: " cursos",
        },
        {
          color: "brown",
          icon: "mdi-bell-ring",
          textA: " Cantidad total de cursos activos: ",
          textStrong: this.cursosActivos,
          textB: " cursos",
        },
        {
          color: "orange darken-4",
          icon: "mdi-bell-ring",
          textA: " Cantidad total de cursos: ",
          textStrong: this.cursosTerminados + this.cursosActivos,
          textB: " cursos",
        },
      ];
    },
  },
};
</script>

<style>
</style>