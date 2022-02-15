<template>
  <login-form :formData="formData" @buttonClick="registrar" />
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      formData: {
        title: "Registro de Usuario",
        buttonText: "Registrar",
      },
    };
  },
  methods: {
    registrar(user) {  
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(() => {
          let vm = this;
          this.$router.push({ name: "Home" });
          this.$store.commit("setAlertMsg", `${user.email} ha iniciado sesión`);
          setTimeout(() => {
            vm.$store.commit("setAlert", true);
            setTimeout(() => {
              vm.$store.commit("setAlert", false);
            }, 3000);
          }, 1000);
        })
        .catch((error) => {
          let vm = this;
          const errorCode = error.code;
          console.log(errorCode);
          if (errorCode == "auth/email-already-in-use") {
            this.$store.commit("setAlertMsg", "Este usuario ya existe");
            setTimeout(() => {
              vm.$store.commit("setError", true);
            }, 1000);
          }
          if (errorCode == "auth/weak-password") {
            this.$store.commit("setAlertMsg", "La contraseña es muy débil");
            setTimeout(() => {
              vm.$store.commit("setError", true);
            }, 1000);
          }
          if (errorCode == "auth/invalid-email") {
            this.$store.commit("setAlertMsg", "Correo inválido");
            setTimeout(() => {
              vm.$store.commit("setError", true);
            }, 1000);
          }
        });
    },
  },
};
</script>

<style>
</style>