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
        show: false,
        participants: []
    },
    mutations: {
        participantes: (state, user) => {
            if(state.participants) {
                state.participants.forEach((p, i) => {
                    if(p._id === user._id) state.participants[i] = user;
                });
            }
        }
    },
    getters: { 
        isParticipantActive: (state) => (user) => {
            state.retro.participants.forEach((p, i) => {
                p = JSON.parse(p);
                if(p._id === user.id) {
                    p.active = user.active;
                    state.retro.participants[i] = JSON.stringify(p);

                    return user.active;
                }
            })
        },
        getParticipants(state) {
            return state.participants && state.participants.length ? state.participants : [];
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

        listenUserUpdate({state, commit}) {

            feathers.service('users').off('updated', listener);
            listener = (user) => {
                commit('participants', user);
            }
            feathers.service('users').on('updated', listener);

        },

        async setRetro({state, getters}, retro_id) {
            const retro = await feathers.service('retros').find({
                query: {
                    _id: retro_id
                }
            });

            if(retro.total) {
                state.retro = retro.data[0];
                state.participants = state.retro && state.retro.participants.map(p => JSON.parse(p));
            } else {
                console.log("NAO FOI POSSÍVEL ACHAR RETRO COM ID: " + retro_id);
            }
        },

        showComments({ state }, show ) {
            state.show = show;
        }
    }
}