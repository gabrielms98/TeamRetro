<template>
    <nav class="navbar navbar-light bg-white shadow-sm pr-0 fixed-top">
        <div class="container-fluid">
            <router-link to="/main" class="navbar-brand">Team Retro</router-link>
            <div class="d-flex">
                <router-link class="btn add-retro" to="/create-retro">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </router-link>
                

                <div class="dropdown">
                    <button class="btn p-0" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img :src="user.image" alt="Profile pic" class="rounded p-0" style="width: 40px;">
                    </button>

                    <div>
                        <div class="dropdown-menu dropdown-menu-right text-center"  aria-labelledby="dropdownMenuLink">
                            <div class="dropdown-header">
                                {{user.name}}
                            </div>
                            <div class="dropdown-divider"></div>
                            <button v-if="user" class="btn btn-danger p-1 dropdown-item" @click="logOut()">Log out</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </nav>
</template>

<script>
import { useState, useActions } from '@u3u/vue-hooks';

import CreateRetro from './CreateRetro';

export default {
    components: {
        CreateRetro
    },

    setup() {
        const { user } = useState('auth', [
            'user'
        ]);

        const { logOut } = useActions('auth', [
            'logOut'
        ]);

        return { 
            user,
            logOut
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