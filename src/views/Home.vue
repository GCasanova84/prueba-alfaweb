<template>
  <div>
    <div class="text-h2 text-center pt-8">Lista de Cursos</div>
    <v-container class="mt-3">
      <v-row no-gutters>
        <v-col
          v-for="(course, index) in courses"
          :key="index"
          md="4"
          class="pa-3"
        >
          <home-card :cardData="course" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import HomeCard from "../components/HomeCard.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",

  components: {
    HomeCard,
  },
  computed: {
    ...mapGetters(["courses"]),
  },
};
</script>
