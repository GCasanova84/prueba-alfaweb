<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Agregar Curso
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Agregando Curso</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="40"
            :rules="nameRules"
            label="Nombre"
            required
          ></v-text-field>

          <v-text-field
            v-model="url"
            :rules="textRule"
            label="URL de la Imagen del curso"
            required
          ></v-text-field>

          <v-text-field
            label="Cupos del curso"
            type="number"
            step="any"
            min="0"
            ref="input"
            :rules="[numberRule]"
            v-model.number="cupos"
          ></v-text-field>

          <v-text-field
            label="Inscritos del curso"
            type="number"
            step="any"
            min="0"
            ref="input"
            :rules="inscritosRules"
            v-model.number="inscritos"
          ></v-text-field>

          <v-text-field
            v-model="duracion"
            :rules="textRule"
            label="Duración del curso"
            required
          ></v-text-field>

          <v-text-field
            label="Costo del curso"
            type="number"
            step="any"
            min="0"
            ref="input"
            :rules="[numberRule]"
            v-model.number="costo"
          ></v-text-field>

          <v-text-field
            v-model="codigo"
            :rules="textRule"
            label="Código del curso"
            required
          ></v-text-field>

          <v-textarea
            outlined
            v-model="descripcion"
            :rules="textRule"
            label="Descripción del curso"
            required
          ></v-textarea>

          <div class="d-flex">
            <confirm-dialog
              :valid="valid"
              :button="button"
              :msg="msg"
              :buttonText="buttonText"
              @clicked="validate"
              @accepted="addCourse"
            />

            <v-btn color="error" class="mr-4" @click="reset">
              Limpiar Formulario
            </v-btn>

            <v-btn color="warning" @click="resetValidation">
              Limpiar Validación
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import ConfirmDialog from "./ConfirmDialog.vue";

export default {
  components: {
    ConfirmDialog,
  },
  data() {
    return {
      dialog: false,
      valid: true,
      name: "",
      url: "",
      cupos: 0,
      inscritos: 0,
      duracion: "",
      costo: 0,
      codigo: "",
      descripcion: "",
      nameRules: [
        (v) => !!v || "Este campo es requerido",
        (v) =>
          (v && v.length <= 40) ||
          "El nombre debe tener menos de 40 caracteres",
      ],
      textRule: [(v) => !!v || "Este campo es requerido"],
      numberRule: (v) => {
        if (v < 0) return "Por favor ingresa un número positivo";
        return true;
      },
      inscritosRules: [
        (v) => v >= 0 || "Por favor ingresa un número positivo",
        (v) =>
          v <= this.cupos ||
          "El número de inscritos no puede superar al número de cupos",
      ],
      button: true,
      msg: "",
      buttonText: "Agregar curso",
    };
  },
  computed: {
    curso() {
      let today = new Date();
      return {
        nombre: this.name,
        imagen: this.url,
        cupos: this.cupos,
        inscritos: this.inscritos,
        duracion: this.duracion,
        costo: this.costo,
        codigo: this.codigo,
        descripcion: this.descripcion,
        fecha: today,
        estado: false,
      };
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      this.msg = `¿Deseas agregar ${this.name}?`
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    resetData() {
      this.valid = true;
      this.name = "";
      this.url = "";
      this.cupos = 0;
      this.inscritos = 0;
      this.duracion = "";
      this.costo = 0;
      this.codigo = "";
      this.descripcion = "";
    },
    async addCourse() {
      await this.$store.dispatch("addCourse", this.curso);
      this.dialog = false;
      this.$store.commit("setAlertMsg", `${this.curso.nombre} se ha agregado con éxito`);
      this.resetData();
      this.resetValidation();      
    },
  },
};
</script>

<style>
</style>