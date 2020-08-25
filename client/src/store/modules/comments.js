import feathers from '../../feathers.js';

let listener;

export default {
    namespaced: true,
    state: { 
        loading: false,
        error: '',
        retro: null,
        all_comments: [],
        comment_start: [],
        comment_stop: [],
        comment_continue: [],
        show: false
    },
    getters: { 
        getParticipants(state) {
            return state.retro.participants && state.retro.participants.length && state.retro.participants.map(r => JSON.parse(r));
        }
    },
    actions: { 
        async create(_, comment) {
            await feathers.service('comments').create(comment);
        },

        async listen({ state }) {

            if(!state.retro) return;
            
            const comments = await feathers.service('comments').find({
                query: { 
                    retro_id: state.retro._id,
                    $sort: { createdAt: 1 }
                }
            });

            state.all_comments = comments.data;
            state.comment_start = state.all_comments.filter(comment => comment.action === 1)
            state.comment_stop = state.all_comments.filter(comment => comment.action === 2)
            state.comment_continue = state.all_comments.filter(comment => comment.action === 3)
            
            feathers.service('comments').off('created', listener);
            listener = (comment) => {
                state.all_comments.push(comment);
                state.comment_start = state.all_comments.filter(comment => comment.action === 1)
                state.comment_stop = state.all_comments.filter(comment => comment.action === 2)
                state.comment_continue = state.all_comments.filter(comment => comment.action === 3)
            };
            feathers.service('comments').on('created', listener);   
        },

        async setRetro({state, commit}, retro_id) {
            const retro = await feathers.service('retros').find({
                query: {
                    _id: retro_id
                }
            });

            if(retro.total) {
                state.retro = retro.data[0];
            } else {
                console.log("NAO FOI POSSÍVEL ACHAR RETRO COM ID: " + retro_id);
            }
        },

        showComments({ state }, show ) {
            state.show = show;
        }
    }
}