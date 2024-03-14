<template>
  <v-img
    width="30"
    height="30"
    :style="{ cursor: 'pointer' }"
    :class="{ 'bounce-animation': disabled }"
    src="../img/post_recommend_default.png"
    @click="() => { startAnimation(); onClickImg(); }"
  />
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SqueezeImg',
  props: {
    onClickImg: {
      type: Function,
      required: true
    },
    imageUrlDefault: {
      type: String,
      default: "../img/post_recommend_default.png"
    },
    imageUrlClicked: {
      type: String,
      default: "../img/post_recommend_selected.png",
    }
  },
  data() {
    // TODO: Fix to dynamic image change
    return {
      imageUrl: "../img/post_recommend_default.png",
      disabled: ref(false),
    }
  },
  methods: {
    startAnimation() {
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 800); // 밀리초 단위로 지정합니다.
    }
  }
}
</script>

<style scoped>
.bounce-animation {
  /* bounce 애니메이션 */
  animation: bounce 0.4s ease infinite alternate;
}

@keyframes bounce {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.6);
  }
}
</style>