<template>
    <nav class="navbar navbar-light bg-white shadow-sm pr-0">
        <div class="container-fluid">
            <a href="#" class="navbar-brand">Team Retro</a>
            <div class="d-flex">
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

<style>

</style>