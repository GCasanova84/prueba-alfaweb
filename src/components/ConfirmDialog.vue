<template>
  <div class="mr-4">
    <v-btn v-if="button" color="success" :disabled="!valid" @click.stop="clicked">
      Agregar
    </v-btn>
    <v-icon v-else small @click="clicked"> mdi-delete </v-icon>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Confirmación </v-card-title>
        <v-card-text
          >{{ msg }}</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="accepted"> {{ buttonText }} </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ConfirmDialog",
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    valid: Boolean,
    button: Boolean,
    msg: String,
    buttonText: String,
  },
  methods: {
    async clicked() {
      await this.$emit("clicked");
      if (this.valid) this.dialog = true;
    },
    async accepted() {
      await this.$emit("accepted");
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>