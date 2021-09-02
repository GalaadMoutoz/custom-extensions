<template>
  <v-app>
    <v-main>
      <v-container class="fill-height align-stretch">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss">
.firebase-emulator-warning {
  display: none;
}
</style>
