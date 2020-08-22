<template>
  <div id="app">
    <Navbar v-if="user"></Navbar>
    <router-view/>
  </div>
</template>

<script>
import { useActions, useState } from '@u3u/vue-hooks';
import Navbar from '@/components/Navbar.vue'

export default {

  components: {
    Navbar
  },

  setup() {
    const { reAuth } = useActions('auth', [
      'reAuth'
    ]);
    
    const { user } = useState('auth', [
      'user'
    ])

    reAuth();

    return { 
      user
    }
  }
  
}
</script>

<style lang="scss">
@import 'styles/main.scss';
</style>
