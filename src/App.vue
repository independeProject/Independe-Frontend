<script setup>
import AppFooter from './common/AppFooter.vue';
import AppHeader from './common/AppHeader.vue';
import {useRoute} from 'vue-router';
import {noHeaderRoutes} from './config/siteConfig';
import {onMounted, ref, watch} from 'vue';

const route = useRoute();
const showHeader = ref(true);

onMounted(() => {
  watch(route, (to, from) => {
    showHeader.value = !noHeaderRoutes.includes(to.path);
    console.log('showHeader', showHeader.value);
  });
});

</script>

<template>
  <v-app>
    <AppHeader v-if="showHeader" />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  })
};
</script>./common/AppHeader.vue
