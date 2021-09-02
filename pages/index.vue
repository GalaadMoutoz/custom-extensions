<template>
  <v-row justify="center" class="align-content-center">
    <v-col cols="12" md="10" lg="8">
      <h2>Tests</h2>
    </v-col>
    <v-col cols="12" md="10" lg="8">
      <v-card>
        <v-card-title>Doc Loader</v-card-title>
        <v-card-text>
          <pre>{{ $dummyDoc() }}</pre>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoginPage extends Vue {
  mounted() {
    this.$store.dispatch("loaders/loadDummyDoc");
  }
}
</script>

<style lang="scss"></style>
