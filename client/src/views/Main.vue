<template>
  <div class=main>
    <ListRetros></ListRetros>
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
    const { router } = useRouter();
    
    const { logOut, isLoggedIn } = useActions('auth', [
      'logOut',
      'isLoggedIn'
    ]);

    const { user } = useState('auth', [
      'user'
    ]); 

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
  background: $azul_camarada;
  color: $primary;
  display: flex;
  //justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5vh;
}
</style>