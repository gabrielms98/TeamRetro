<template>
    <div class="create-retro">

        <div class="alert alert-success" role="alert" v-if="success"><strong>{{inputName}}</strong> inserido com sucesso!</div>
        <div class="alert alert-danger" role="alert" v-if="fail">{{inputName}} não pode ser inserido!</div>

        <div class="form-group">
            <label for="nameRetro">Nome</label>
            <input type="text" class="form-control" id="nameRetro" aria-describedby="emailHelp" v-model="inputName">
            <small id="emailHelp" class="form-text text-muted">Defina qual será o nome dessa retro!</small>
        </div>

        <button class="btn btn-primary" :disabled="!inputName" @click="addRetro()">Enviar</button>
    </div>
</template>

<script>
import { ref, watch } from '@vue/composition-api';
import { useState, useActions, useRouter } from '@u3u/vue-hooks';

export default {
    setup() {
        let inputName = ref('');
        let success = false;
        let fail = false;

        const { router } = useRouter();

        const { user } = useState('auth', [
            'user'
        ]);

        const { retros } = useState('retros', [
            'retros'
        ]);

        const { create, get } = useActions('retros', [
            'create',
            'get'
        ]);

        function addRetro() {
            if(retros.value.some(retro => retro.name === inputName.value)) {
                //TODO: ERROR HANDLING
                this.fail = true;
                return;
            }
            create({
                name: inputName.value,
                admin: user._id,
                participants: []
            });
            router.push("/main");
            this.success = true;
        }

        return { 
            inputName,
            addRetro,
            success,
            fail
        };
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/abstracts/_variables.scss';
.create-retro {
    background: $bg_dark;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>