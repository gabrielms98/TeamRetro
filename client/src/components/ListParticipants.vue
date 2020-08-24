<template>
  <div class="list-participans mb-3">
      <div >
          <img v-for="participant in participants" v-bind:key="participant._id" :src="participant.image" alt="Profile pic" class="rounded p-0 shadow-lg mr-2" v-bind:class="{'active': participant.active, 'away': !participant.active}" style="width: 40px;">
      </div>
  </div>
</template>

<script>
import { useState, useActions, useRouter } from '@u3u/vue-hooks';
export default {

    setup() {

        let participants = [];

        const { retro } = useState('comments', [
            'retro'
        ]);

        function getParticipants() {
            if(retro.value && retro.value.participants) {
                return retro.value.participants.map(p => JSON.parse(p));
            }
        }

        participants = getParticipants();

        return { 
            retro,
            participants
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