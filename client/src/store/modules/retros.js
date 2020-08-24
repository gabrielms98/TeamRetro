import feathers from '../../feathers';


export default {
    namespaced: true,
    state: { 
        loading: false,
        retros: [],
        page: [],
        page_number: 1, 
        pageCount: 0
    },
    getters: {
        getPage(state) {
            return state.retros.slice((state.page_number - 1) * 5, state.page_number * 5);
        },
        currentPage(state) {
            return state.page_number;
        },
        pageCount(state) {
            return state.pageCount;
        }
    },
    actions: { 
        async get({ state }) {
            state.loading = true;

            const retros = await feathers.service('retros').find({ 
                query: {
                    $sort: { createdAt: 1}
                }
            });
            
            state.pageCount = parseInt(retros.data.length / 5) + 1;
            state.retros = retros.data;
            state.loading = false;
        },

        isOnRetro(retro, user_id) {
            return retro.participants.some(p => p === user_id);
        },

        async create(_, retro) {
            await feathers.service('retros').create(retro);
        },

        async joinRetro({state}, { user, retro} ) {
            retro.participants.push(JSON.stringify(user));
            await feathers.service('retros').update(retro._id,retro);
        }
    }
}