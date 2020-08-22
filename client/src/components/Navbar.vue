<template>
    <nav class="navbar navbar-light bg-white shadow-sm pr-0 fixed-top">
        <div class="container-fluid">
            <a href="#" class="navbar-brand">Team Retro</a>
            <div class="d-flex">
                <router-link class="btn add-retro" to="/paçoca" type="button">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </router-link>
                <img :src="user.image" alt="Profile pic" class="rounded p-0" style="width: 40px;">
            </div>
        </div>
    </nav>
</template>

<script>
import { useState } from '@u3u/vue-hooks';

export default {

    setup() {
        const { user } = useState('auth', [
            'user'
        ]);

        return { 
            user
        };
    }

}
</script>

<style lang="scss" scoped>
    .add-retro {
        outline: none !important;

        &:focus {
            box-shadow: none !important;
        }
    }
</style>