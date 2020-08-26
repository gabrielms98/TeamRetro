import feathers from '../../feathers';

let listener;

export  default {
    namespaced: true,
    state: {
        loading: false,
        error: '',
        user: null
    },
    getters: {
        isActive: (state) => async (id) => {
            const user = await feathers.service('users').get(id);

            return user && user.active;
            
        }
    },
    actions: {
        async reAuth({ state }) {
            try {
                state.loading = true;
                const { user } = await feathers.reAuthenticate();
                state.user = user;
            } catch (error) {
                console.log(error.toString());
            }
            state.loading = false;
        },
        loginWithGithub({ state }) {
            state.loading = true;
            console.log("OI");
            async function receiveMessage(event) {
                console.log("OLAAA", event.origin, event.data.token);

                if(event.origin !== 'http://localhost:3030') return;

                console.log("KAJSDHASH");
                const { user } = await feathers.authenticate({
                    strategy: 'jwt',
                    accessToken: event.data.token
                })

                state.user = user;
                state.loading = false;
                window.removeEventListener('message', receiveMessage);
            }

            window.addEventListener('message', receiveMessage, {
                once: true
            });
            window.open('http://localhost:3030/oauth/github');
        },
        async logOut({ state }) {
            await feathers.logout();
            state.user = null;
        },
        idLoggedIn() {
            return !!user;
        },
        async getUser({ state }, user_id) {
            state.loading = true;
            const resp = await feathers.service('users').get(user_id);
            state.loading = false;
            return resp.data;
        },
        async setUserActive({state}, active) {
            state.user.active = active;
            await feathers.service('users').update(state.user._id, state.user);
        },
        async listen({getters}, id) {
            feathers.service('users').off('updated', listener);

            listener = (users) => {
                console.log(users.active);
                if(users._id === id); //return getters.isActive(users._id);
            }

            feathers.service('users').on('updated', listener);
        }
    }
}