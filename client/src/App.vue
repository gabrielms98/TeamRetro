<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { useActions, useState } from '@u3u/vue-hooks';

export default {

  setup() {
    const { reAuth } = useActions('auth', [
      'reAuth'
    ]);
    
    const states = useState('auth', [
      'user'
    ])

    reAuth();
  }
  
}
</script>

<style lang="scss">
@import 'styles/main.scss';
</style>
