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
        comment_continue: []
    },
    actions: { 
        async create(_, comment) {
            await feathers.service('comments').create(comment);
        },

        async listen({ state }) {
            const comments = await feathers.service('comments').find({
                query: { 
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
        }
    }
}