<template>
  <div class=main>
    <Retro></Retro>
    <button v-if=user class="btn btn-danger" @click="logOut()">Log out</button>
  </div>
</template>

<script>
import { useState, useActions, useRouter } from '@u3u/vue-hooks';
import { watch } from '@vue/composition-api';
import Retro from '../components/Retro';

export default {
  components: {
    Retro
  },

  setup() {
    const { logOut } = useActions('auth', [
      'logOut'
    ]);

    return { 
      logOut
    };
  }

}
</script>

<style lang="scss" scoped>
@import '../styles/abstracts/_variables.scss';
.main {
  width: 100%;
  height: 100%;
  background: $bg_dark;
  color: $primary;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>