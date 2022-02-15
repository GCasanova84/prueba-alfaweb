<template>
  <div>
    <v-card>
      <v-img height="250px" :src="cardData.imagen"></v-img>
      
      <v-card-text class="grey lighten-3">
        <v-card-title class="my-4 ml-8 pl-0">
          {{ cardData.nombre }}
        </v-card-title>
        <div class="font-weight-bold ml-8 mb-2">Información</div>

        <v-timeline align-top dense>
          <v-timeline-item
            v-for="(info, index) in infos"
            :key="index"
            :color="info.color"
            small
          >
            <div>
              <div class="font-weight-normal">
                {{ info.topRegular }}<strong>{{ info.topBold }}</strong>
              </div>
              <div>{{ info.bottom }}</div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "HomeCard",
  props: {
    cardData: Object,
  },
  computed: {
    infos() {
      return [
        {
          topRegular: "Costo: ",
          topBold: this.cardData.costo,
          bottom: "Duración: " + this.cardData.duracion,
          color: "deep-purple lighten-1",
        },
        {
          topRegular: "Cupos: ",
          topBold: this.cardData.cupos,
          bottom: "Completado: " + (this.cardData.estado ? 'Sí' : 'No'),
          color: "green",
        },
        {
          topRegular: "Fecha de Registro:",
          topBold: "",
          bottom: this.cardData.fecha.toDate().getDate() + '-' + (this.cardData.fecha.toDate().getMonth() + 1) + '-' + this.cardData.fecha.toDate().getFullYear(),
          color: "deep-purple lighten-1",
        },
        {
          topRegular: "Descripción:",
          topBold: "",
          bottom: this.cardData.descripcion,
          color: "green",
        },
      ];
    },
  },
};
</script>

<style>
    .v-image__image {
        background-size: contain;
    }
</style>