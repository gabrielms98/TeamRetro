import feathers from '../../feathers';


export default {
    namespaced: true,
    state: { 
        loading: false,
        retros: [],
    },
    actions: { 
        async get({ state }) {
            state.loading = true;

            const retros = await feathers.service('retros').find({ 
                query: {
                    $sort: { createdAt: 1}
                }
            });

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