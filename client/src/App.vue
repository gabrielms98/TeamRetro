<template>
  <div id="app">
    <Navbar v-if="user" class="shadow"></Navbar>
    <router-view/>
  </div>
</template>

<script>
import { useActions, useState, useRouter } from '@u3u/vue-hooks';
import { watch } from '@vue/composition-api';
import Navbar from '@/components/Navbar.vue'

export default {

  components: {
    Navbar
  },

  setup() {
    const { router } = useRouter();

    const { reAuth } = useActions('auth', [
      'reAuth'
    ]);
    
    const { user } = useState('auth', [
      'user'
    ]);

    reAuth();

    watch(user, () => {
      if(user.value) {
        router.push('/main');
      } else {
        router.push('/');
      }
    });

    return { 
      user
    }
  }
  
}
</script>

<style lang="scss">
@import 'styles/main.scss';
</style>
