<script setup>
import AppFooter from './common/AppFooter.vue';
import AppHeader from './common/AppHeader.vue';
import {useRoute} from 'vue-router';
import {noHeaderRoutes} from './config/siteConfig';
import {onMounted, ref, watch} from 'vue';

const route = useRoute();
const showHeader = ref(true);

function loadScript() {
  const script = document.createElement("script");
  /* global kakao */
  script.onload = () => kakao.maps.load(this.initMap);
  script.src = "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=4e77d9b3460eb3b942634fb28e5e1c40&libraries=services";
  document.head.appendChild(script);
}

onMounted(() => {
  watch(route, (to, from) => {
    showHeader.value = !noHeaderRoutes.includes(to.path);
    console.log('showHeader', showHeader.value);
  });
  loadScript();
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
