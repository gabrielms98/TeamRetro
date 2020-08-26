<template>
  <div class="list-retros mt-5">
    
    <SearchBar />

    <div class="text-center" v-if="loadingRetro">
        <Loading />
    </div>

    <div class="my-3 p-3 bg-white rounded box-shadow" style="width: 75vw;" v-if="!loadingRetro">
        <h6 class="border-bottom border-gray pb-2 mb-0">Lista de retros</h6>
        <div class="media text-muted pt-3" v-for="retro in getPage" v-bind:key="retro._id">
          <!-- <img data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1" alt="32x32" class="mr-2 rounded" style="width: 32px; height: 32px;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17416cb6be2%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17416cb6be2%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2212.2890625%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true"> -->
          <div style="width: 32px; height: 32px background: #e74c3c;" class="rounded"></div>
          <div class="row border-bottom mr-2">
              <div class="col-sm-10">
                  <p class="media-body pb-3 mb-0 small lh-125 border-gray">
                        <strong class="d-block text-gray-dark">{{retro.name}}</strong>
                        <span v-for="user in retro.participants" v-bind:key="user">
                            {{parse(user)}}
                        </span>
                    </p>
              </div>
              <div class="col-sm-2 center-content mb-3">
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
                                <button type="button" @click="join(currentRetro)" class="btn btn-primary">Join</button>
                            </div>
                            </div>
                        </div>
                    </div>
              </div>
          </div>
        </div>
    </div>

    <nav aria-label="...">
        <ul class="pagination justify-content-center">
            <li class="page-item">
                <button class="page-link" href="#" tabindex="-1">Previous</button>
            </li>
            <li class="page-item" v-for="i in pageCount" v-bind:key="i"><button class="page-link " @click="goToPage(i)">{{i}}</button></li>
            <li class="page-item">
                <button class="page-link">Next</button>
            </li>
        </ul>
    </nav>
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

        function getRetro(id) {
            retros.value.forEach(retro => {
                if(retro._id === id) return retro;
            });
            return null;
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
            getRetro,
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
</style>