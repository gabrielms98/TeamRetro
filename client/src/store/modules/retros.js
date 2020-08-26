import feathers from '../../feathers';


export default {
    namespaced: true,
    state: { 
        loading: false,
        retros: [],
        page: [],
        page_number: 1, 
        pageCount: 0,
        searchbar: ''
    },
    getters: {
        getPage(state) {
            if(!state.searchbar) return state.retros.slice((state.page_number - 1) * 5, state.page_number * 5);
            else {
                const match = [];
                state.retros.forEach(retro => {
                    if (retro.name.toLowerCase().indexOf(state.searchbar) >= 0) {
                        match.push(retro);
                    }
                });
                state.page = [];
                return match;
            }
        },
        currentPage(state) {
            return state.page_number;
        },
        pageCount(state) {
            return state.pageCount;
        },
        getPageByIndex: (state) => (i) => {
            return state.retros.slice((i - 1) * 5, i * 5);
        }
    },
    actions: { 
        async get({ state }) {
            state.loading = true;

            const retros = await feathers.service('retros').find({ 
                query: {
                    $sort: { createdAt: 1},
                    $limit: 999
                }
            });

            const TOTAL_RETROS = retros.total || 0;

            state.pageCount = Math.round(TOTAL_RETROS/5) + 1
            state.retros = retros.data;
            state.loading = false;
        },

        isOnRetro(retro, user_id) {
            return retro.participants.some(p => p === user_id);
        },

        async create({state}, retro) {
            await feathers.service('retros').create(retro);
        },

        async joinRetro({state}, { user, retro}) {
            retro.participants.push(JSON.stringify(user));
            await feathers.service('retros').update(retro._id,retro);
        },

        goToPage({state, getters}, page) {
            state.page_number = page;
            return getters.getPage;
        },

        getRetrosMatch({state, getters}, name) {
            state.searchbar = name.toLowerCase();
        }
    }
}