<template>
  <div class="list-participans mb-3">
      <div v-for="participant in getParticipants" v-bind:key="participant._id" >
          <img :src="participant.image" alt="Profile pic" class="rounded p-0 shadow mr-2" style="width: 40px;">
      </div>
  </div>
</template>

<script>
import { useState, useActions, useRouter, useGetters, useMutations } from '@u3u/vue-hooks';
import { ref } from '@vue/composition-api';
export default {

    setup() {
        const { retro } = useState('comments', [
            'retro'
        ]);

        const { getParticipants, isParticipantActive } = useGetters('comments', [
            'getParticipants',
            'isParticipantActive'
        ]);

        const { user } = useState('auth', [
            'user'
        ])

        const { isActive } = useGetters('auth', [
            'isActive'
        ]);

        const { listenUserUpdate } = useActions('comments', [
            'listenUserUpdate'
        ]);

        const { setUserActive, listen } = useActions('auth', [
            'setUserActive',
            'listen'
        ]);

        // listenUserUpdate();

        return { 
            retro,
            isActive,
            getParticipants,
            isParticipantActive,
            listen
        };

    }

}
</script>

<style lang="scss" scoped>
@import '../styles/abstracts/_variables.scss';

.active {
    border: 2px solid $success;
}

.away {
    border: 2px solid $warning;
}

</style>