<template>
  <v-data-table
    :headers="headers"
    :items="cursosTabla"
    :items-per-page="10"
    item-key="name"
    class="elevation-1 mb-3"
    :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus',
    }"
  >
    <template v-slot:item.costo="{ item }">
      <v-chip color="green" dark>
        {{ "$ " + item.costo }}
      </v-chip>
    </template>
    <template v-slot:item.terminado="{ item }">
      <v-chip :color="item.terminado ? 'blue' : 'grey'" dark>
        {{ item.terminado ? "Sí" : "No" }}
      </v-chip>
    </template>
    <template v-slot:item.fecha="{ item }">
      <v-chip color="green" dark>
        {{ item.fecha.toDate().getDate() + '-' + (item.fecha.toDate().getMonth() + 1) + '-' + item.fecha.toDate().getFullYear() }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <div class="d-flex">
        <v-icon small class="mr-2" @click="editItem(item.id)">
          mdi-pencil
        </v-icon>
        <confirm-dialog
          :valid="valid"
          :button="button"
          :msg="msg"
          :buttonText="buttonText"
          @clicked="crearMensaje(item.curso)"
          @accepted="deleteItem(item)"
        />
      </div>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
import ConfirmDialog from "./ConfirmDialog.vue";

export default {
  name: "AdminTable",
  components: {
    ConfirmDialog,
  },
  data() {
    return {
      headers: [
        { text: "Curso", value: "curso", sortable: false },
        { text: "Cupos", value: "cupos", sortable: false },
        { text: "Inscritos", value: "inscritos", sortable: false },
        { text: "Duración", value: "duracion", sortable: false },
        { text: "Costo", value: "costo", sortable: false },
        { text: "Terminado", value: "terminado", sortable: false },
        { text: "Fecha", value: "fecha", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      valid: true,
      button: false,
      msg: "",
      buttonText: "Sí, borrar",
    };
  },
  computed: {
    ...mapGetters(["courses"]),
    cursosTabla() {
      return this.courses.map((curso) => {
        return {
          curso: curso.nombre,
          cupos: curso.cupos,
          inscritos: curso.inscritos,
          duracion: curso.duracion,
          costo: curso.costo,
          terminado: curso.estado,
          fecha: curso.fecha,
          id: curso.id,
        };
      });
    },
  },
  methods: {
    async deleteItem(course) {
      await this.$store.dispatch("deleteCourse", course.id);
      this.$store.commit("setAlertMsg", `${course.curso} se ha eliminado con éxito`);       
    },
    editItem(courseId) {
      this.$router.push({ name: "Edicion", params: { id: courseId } });
    },
    crearMensaje(curso) {
      this.msg = `¿Deseas borrar ${curso}?`;
    },
  },
};
</script>

<style>
</style>