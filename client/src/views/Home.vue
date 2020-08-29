<template>
  <div class="home">
    <nav class="navbar bg-transparent w-100 justify-content-between px-4 pt-3">
        <a href="#" class="navbar-brand">
          <img src="../assets/retromaniac-logo-2D3045.png" width="40">
        </a>
    </nav>

    <div class="container h-100 mt-5 ml-5">
      <div class="row w-50 mt-5 title-header ml-2">
        <h2 class="titulo">Retromaniac</h2>
        <h5>Lorem Ipsum
          Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
        </h5>
      </div>

      <div class="row ml-2 mt-5 ">
          <div>
            <button class="btn shadow custom-button" @click="loginWithGithub()" v-if="!loading && !user">
              <span class="d-flex align-items-center">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1 mr-2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                Login with Github
              </span>
            </button>
            <Loading v-if="loading && !user" class="ml-2"></Loading>
          </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { useState, useActions, useRouter } from '@u3u/vue-hooks';
import { watch } from '@vue/composition-api';
import Loading from '../components/Loading';

export default {
  name: 'Home',
  components: {
    Loading
  },
  setup() {

    const { router } = useRouter();

    const { user, loading } = useState('auth', [
      'user',
      'loading'
    ]);

    const { loginWithGithub, logOut, isLoggedIn } = useActions('auth', [
      'loginWithGithub',
      'logOut',
      'isLoggedIn'
    ]);

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
  font-family: 'Roboto', sans-serif;
  height: 100%;
  width: 100%;
  background-color: $bg_dark;

  background-image: url('../assets/g10home.png');
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
  color: #2E3046;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.title-header h2{
  font-size: 60px !important;
  font-weight: 900;
  margin-top: 8vh;
}

.titulo {
  color: $orange;
}

.custom-button {
  background-color: $azul_camarada;
  border-radius: 25px;
  padding: 0.5rem 2rem;
  box-shadow: 0.1em 0.1em 0.2em rgba(0,0,0,0.15);
  font-size: 1.25rem;
  color: white;
}
</style>
