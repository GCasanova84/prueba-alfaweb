<template>
  <login-form :formData="formData" @buttonClick="login"></login-form>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      formData: {
        title: "Login de Usuario",
        buttonText: "Iniciar",
      },
    };
  },
  methods: {
    login(user) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
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
          if (errorCode == "auth/user-not-found") {
            this.$store.commit("setAlertMsg", "Usuario no encontrado. Ir a ");
            this.$store.commit("setRegistro", true);
            setTimeout(() => {
              vm.$store.commit("setError", true);
            }, 1000);
          }
          if (errorCode == "auth/wrong-password") {
            this.$store.commit("setAlertMsg", "Contraseña equivocada");
            setTimeout(() => {
              vm.$store.commit("setError", true);
            }, 1000);
          }
          if (errorCode == "auth/too-many-requests") {
            this.$store.commit("setAlertMsg", "Has superado el número de intentos permitidos");
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