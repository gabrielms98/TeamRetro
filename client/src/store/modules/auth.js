import feathers from '../../feathers';

export  default {
    namespaced: true,
    state: {
        loading: false,
        error: '',
        user: null
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
            async function receiveMessage(event) {

                if(event.origin !== 'http://localhost:3030') return;

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
        }
    }
}