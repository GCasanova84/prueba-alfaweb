<template>
  <div>
    <div class="d-flex align-center justify-center mt-8">
      <span class="text-h2 mr-2">Editando el curso: {{ curso.nombre }}</span>
    </div>
    <div class="px-16 mt-8">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :counter="20"
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
          :rules="numberRules"
          v-model="cupos"
          required
        ></v-text-field>

        <v-text-field
          label="Inscritos del curso"
          :rules="inscritosRules"
          v-model="inscritos"
          required
        ></v-text-field>

        <v-text-field
          v-model="duracion"
          :rules="textRule"
          label="Duración del curso"
          required
        ></v-text-field>

        <v-text-field
          label="Costo del curso"
          :rules="numberRules"
          v-model="costo"
          required
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

        <v-text-field
          v-model="fecha"
          :rules="textRule"
          label="Fecha de Registro"
          required
        ></v-text-field>

        <v-switch
          v-model="terminado"
          :label="`Terminado: ${terminado ? 'Sí' : 'No'}`"
        ></v-switch>

        <div class="d-flex justify-center mt-4 mb-10">
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-8"
            @click="validate"
          >
            Actualizar
          </v-btn>

          <v-btn color="error" class="mr-8" @click="reset">
            Limpiar Formulario
          </v-btn>

          <v-btn color="warning" class="mr-8" @click="resetValidation">
            Limpiar Validación
          </v-btn>

          <v-btn color="primary" @click="regresar"> Regresar </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      curso: Object,
      valid: true,
      name: "",
      url: "",
      cupos: 0,
      inscritos: 0,
      duracion: "",
      costo: 0,
      codigo: "",
      descripcion: "",
      terminado: Boolean,
      fecha: "",
      nameRules: [
        (v) => !!v || "Este campo es requerido",
        (v) =>
          (v && v.length <= 40) ||
          "El nombre debe tener menos de 40 caracteres",
      ],
      textRule: [(v) => !!v || "Este campo es requerido"],
      numberRules: [
        (v) => v !== "" || "Este campo es requerido",
        (v) => v >= 0 || "Por favor ingresa un número positivo",
      ],
      inscritosRules: [
        (v) => v !== "" || "Este campo es requerido",
        (v) => v >= 0 || "Por favor ingresa un número positivo",
        (v) =>
          +v <= +this.cupos ||
          "El número de inscritos no puede superar al número de cupos",
      ],
    };
  },
  computed: {
    year() {
      return this.fecha.split("-")[2];
    },
    month() {
      return this.fecha.split("-")[1];
    },
    day() {
      return this.fecha.split("-")[0];
    },
    updatedCurso() {
      return {
        nombre: this.name,
        imagen: this.url,
        cupos: Number(this.cupos),
        inscritos: Number(this.terminado ? 0 : this.inscritos),
        duracion: this.duracion,
        costo: Number(this.costo),
        codigo: this.codigo,
        descripcion: this.descripcion,
        estado: this.terminado,
        fecha: new Date(this.year, +this.month - 1, this.day),
        id: this.id,
      };
    },
  },
  methods: {
    async validate() {
      await this.$refs.form.validate();      
      if (this.valid) {
        await this.$store.dispatch("updateCourse", this.updatedCurso);
        this.$router.push({ name: "Administracion" });
        this.$store.commit(
          "setAlertMsg",
          `${this.updatedCurso.nombre} se ha actualizado con éxito`
        );
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    regresar() {
      this.$router.push({ name: "Administracion" });
    },
  },
  created() {
    this.curso = this.$store.getters.getCurso(this.id);
    this.name = this.curso.nombre;
    this.url = this.curso.imagen;
    this.cupos = this.curso.cupos;
    this.inscritos = this.curso.inscritos;
    this.duracion = this.curso.duracion;
    this.costo = this.curso.costo;
    this.codigo = this.curso.codigo;
    this.descripcion = this.curso.descripcion;
    this.terminado = this.curso.estado;
    this.fecha =
      this.curso.fecha.toDate().getDate() +
      "-" +
      (this.curso.fecha.toDate().getMonth() + 1) +
      "-" +
      this.curso.fecha.toDate().getFullYear();
  },
};
</script>

<style>
</style>