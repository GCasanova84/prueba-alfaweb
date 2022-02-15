<template>
  <div class="pa-16">
    <h1 v-text="formData.title"></h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :counter="20"
        :rules="passwordRules"
        label="Password"
        type="password"
        required
      ></v-text-field>

      <div class="mt-5 text-center">
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-8"
          @click="validate"
        >
          {{ formData.buttonText }}
        </v-btn>

        <v-btn color="error" class="mr-8" @click="reset">
          Limpiar Formulario
        </v-btn>

        <v-btn color="warning" @click="resetValidation">
          Limpiar Validación
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  props: {
    formData: Object,
  },
  data() {
    return {
      valid: true,
      email: "",
      emailRules: [
        (v) => !!v || "Un e-mail es requerido",
        (v) => /.+@.+\..+/.test(v) || "El e-mail debe ser válido",
      ],
      password: "",
      passwordRules: [
        (v) => !!v || "Un password es requerido",
        (v) =>
          (v && v.length <= 20) ||
          "El password debe contener menos de 20 caracteres",
      ],
    };
  },
  computed: {
    user() {
      return {
        email: this.email,
        password: this.password,
      };
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      this.$emit("buttonClick", this.user);
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style>
</style>