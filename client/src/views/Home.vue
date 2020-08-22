<template>
  <div class="home">
    <h2>Team Retro!</h2>
    <button v-if="!loading && !user" class="btn btn-primary" @click="loginWithGithub()">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
      Login with Github
    </button>
    <span v-if="loading && !user">Logging in...</span>
    <pre v-if="user">
      {{user ? JSON.stringify(user, null, 2) : "No User"}}
    </pre>

    <button v-if=user class="btn btn-danger" @click="logOut()">Log out</button>
  </div>
</template>

<script>
import { useState, useActions, useRouter } from '@u3u/vue-hooks';
import { watch } from '@vue/composition-api';

export default {
  name: 'Home',
  setup() {

    const { router } = useRouter();

    const { user, loading } = useState('auth', [
      'user',
      'loading'
    ]);

    const { loginWithGithub, logOut } = useActions('auth', [
      'loginWithGithub',
      'logOut'
    ]);

    watch(user, () => {
      if(user.value) {
        router.push('/main');
      }
    });

    return { 
      user,
      loading,
      loginWithGithub,
      logOut,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/abstracts/_variables.scss';

.home {
  width: 100%;
  height: 100%;
  background: $bg_dark;
  color: $primary;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

button {
  padding: 0.5rem 2rem;
  box-shadow: 0.1em 0.1em 0.2em rgba(0,0,0,0.15);
}
</style>
