<template>
  <div class="list-retros mt-5">
    
    <SearchBar/>

    <div class="text-center" v-if="loadingRetro">
        <Loading />
    </div>

    <div class="my-3 pt-3 pr-3 pl-3 bg-white rounded" style="width: 50vw;" v-if="!loadingRetro">
        <div class="border-bottom border-gray row mx-3 justify-content-between mb-0">
            <h5 class="d-flex align-items-center">Lista de Retros</h5>
            <div>
                <span>
                    <h6>
                        Sort by 
                        <button class="btn btn-link p-0 m-0">Relevância</button>
                        <button class="btn ml-3">
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                        </button>
                    </h6>
                </span>
            </div>
        </div>

        <div class="media container retro__list__item rounded mt-3" v-for="retro in getPage" v-bind:key="retro._id">
            <div class="row pt-2 pb-2 align-items-center" style="vertical-align: middle;">
                <div class="col-3 pt-1 pb-1 border-right">
                    <h5 class="mb-0">{{retro.name}}</h5>
                </div>
                <div class="col text-right pr-0">
                    <button class="btn" @click="router.push({path: 'retro', query: {retro_id: retro._id}})" v-if="isMemberOfRetro(retro)">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>
                    <button class="btn" @click="currentRetro = retro;" data-toggle="modal" data-target="#pwdModal" v-else>
                        JOIN
                    </button>

                    <div class="modal fade" tabindex="-1" id="pwdModal">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Digite a senha da retro!</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <label for="nameRetro">Senha</label>
                                <input type="password" class="form-control" id="nameRetro" v-model="pwd">
                                <small class="form-text text-muted">Digite a senha da retro para entrar! </small>
                            </div>
                            <div class="modal-footer">
                                <button type="button" @click="join(currentRetro)" data-dismiss="modal" class="btn btn-primary">Join</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row border-top border-gray mx-3 mt-3 pt-2 pb-2 d-flex justify-content-center ">
            <button class="btn mt-1 py-0" v-for="number in pageCount" v-bind:key="number" @click="goToPage(number)">
                <h4 class="current-page px-2 rounded-circle">{{number}}</h4>
            </button>
        </div>

    </div>

  </div>
</template>

<script>
import Loading from './Loading';
import SearchBar from './SearchBar';
import { useState, useActions, useRouter, useGetters } from '@u3u/vue-hooks';
import { watch, ref } from '@vue/composition-api';
export default {
    components: {
        Loading,
        SearchBar
    },

    beforeRouteEnter (to, from, next) {
        console.log("OLA");
    },

    setup() {

        const bcrypt = require('bcryptjs');

        let currentRetro = ref('');
        let pwd = ref('');
        let page = ref('');
        let loadingComponent = ref('');
        loadingComponent.value = false;

        const { router } = useRouter();

        const { user } = useState('auth', [
            'user'
        ]);

        const { retros, loading: loadingRetro } = useState('retros', [
            'retros',
            'loading'
        ]);

        const { get, joinRetro, goToPage } = useActions('retros', [
            'get',
            'joinRetro',
            'goToPage'
        ]);

        const { getPage, currentPage, pageCount } = useGetters('retros', [
            'getPage',
            'currentPage',
            'pageCount'
        ]);

        function parse(string) {
            const { name } = JSON.parse(string);
            return name ? name : "";
        }

        function isMemberOfRetro(retro) {
            return retro.participants && retro.participants.length && retro.participants.some(participant => JSON.parse(participant)._id === user.value._id );
        }

        function join(retro) {

            console.log("retro1", retro._id);

            if(retro) {
                const result = bcrypt.compareSync(pwd.value, retro.password); 

                if(result) {
                    try {
                        joinRetro({user: user.value, retro});

                        router.push({path: 'retro', query: {retro_id: retro._id}})
                    } catch (err) {
                        console.err(err.toString());
                    }
                }
            }
        }



        get();

        //console.log(mp.get("5f41cede596b55338fc2d5e2")[0].then(r => r.data && r.data[0].name));

        return { 
            retros,
            loadingRetro,
            router,
            parse,
            isMemberOfRetro,
            user,
            currentRetro,
            pwd,
            join,
            page,
            loadingComponent,
            getPage,
            pageCount,
            goToPage
        };

    }
}
</script>

<style lang="scss" scoped>
@import '../styles/abstracts/_variables.scss';
.list-retros {
    
}

.list-header {
    background-color: $purple_custom;
}

.center-content {
	display: flex;
	justify-content: center;
	align-items: center;
}

.media .row {
    width: 100%;
}

.upperbar {
    display: flex;
    flex-direction: row;
}

.page-link {
    color: grey;
}

.retro {

    &__list {

        &__item {
            background: $bg_dark;
            border-color: $primary !important;
        }

    }
}

.border-right {
    border-right: 1px solid $primary !important;
}
</style>