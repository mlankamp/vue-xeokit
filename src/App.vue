<script setup lang="ts">
import inf from '../package-lock.json';

import Viewer from '@/components/viewer.vue';
</script>

<template>
  <v-app>
    <v-app-bar :title="`Vue (${inf.packages['node_modules/vue'].version}), typescript (${inf.packages['node_modules/typescript'].version}) and Xeokit (${inf.packages['node_modules/@xeokit/xeokit-sdk'].version})`" />

    <viewer />
    <v-icon />
  </v-app>
</template>
