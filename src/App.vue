<template>
  <v-app>
    <v-app-bar app color="deep-purple" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-app-bar-title class="ml-3">Cursos AlfaWeb</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn text v-if="user" @click="logout">
        <span class="mr-2">{{ user }}</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-snackbar v-model="alert" timeout="3000" color="success" top right app>
      <v-icon class="mr-3">mdi-check-circle</v-icon>
      {{ alertMsg }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="closeAlert">
          OK
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar v-model="error" timeout="-1" color="red darken-2" top right app>
      <v-icon class="mr-3">mdi-alert-circle</v-icon>
      {{ alertMsg }}
      <v-btn v-if="registro" color="white" text @click="irRegistro">
        Registro
      </v-btn>
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="closeError">
          OK
        </v-btn>
      </template>
    </v-snackbar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="route in routes"
            :key="route.title"
            :to="route.name"
          >
            <v-list-item-title>{{ route.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
    routes: [
      { title: "Login", name: { name: "Login" } },
      { title: "Registro", name: { name: "Registro" } },
      { title: "Home", name: { name: "Home" } },
      { title: "Administración", name: { name: "Administracion" } },
    ],
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  computed: {
    ...mapGetters(["user", "alertMsg", "alert", "error", "registro"]),
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          let vm = this;
          this.$router.push({ name: "Login" });
          this.$store.commit("setAlertMsg", "Se ha cerrado la sesión");
          setTimeout(() => {
            vm.$store.commit("setAlert", true);
            setTimeout(() => {
              vm.$store.commit("setAlert", false);
            }, 3000);
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeAlert() {
      this.$store.commit("setAlert", false);
    },
    closeError() {
      this.$store.commit("setError", false);
      this.$store.commit("setRegistro", false);
    },
    irRegistro() {      
      this.$store.commit("setError", false);
      this.$router.push({ name: "Registro" });
      this.$store.commit("setRegistro", false);
    },
  },
  created() {
    this.$store.dispatch("getCourses");
  },
};
</script>

