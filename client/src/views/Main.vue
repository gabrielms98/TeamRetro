<template>
  <div class=main>
    <!-- <Retro></Retro> -->

    <ListRetros></ListRetros>
    <button v-if="user" class="btn btn-danger" @click="logOut()">Log out</button>
  </div>
</template>

<script>
import { useState, useActions, useRouter } from '@u3u/vue-hooks';
import { watch } from '@vue/composition-api';
import ListRetros from '../components/ListRetros';

export default {
  components: { 
    ListRetros
  },

  setup() {
    const { logOut } = useActions('auth', [
      'logOut'
    ]);

    const { user } = useState('auth', [
      'user'
    ])

    return { 
      logOut,
      user
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
  //justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5vh;
}
</style>