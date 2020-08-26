<template>
  <div class="retro">

      <div class="row ">
          <div class="col-6 w-100">
            <ListParticipants style="width: 300px;"/>
          </div>
          <div class="col-6 w-100">
            <ControlPanel style="width: 300px;" class="text-right"/>
          </div>
      </div>

    <div class="row">
        <div class="col mr-3">
            <span class="retro__start">Start</span>

            <div class="row">
                <div class="card border-success mb-3 input-group">
                    <textarea  type="text" class="rounded start" v-on:keyup.enter="sendComment(1, commentStart)" v-model="commentStart"></textarea>
                </div>
            </div>

            <transition-group name="slide">
                <div class="row" v-for="comment in comment_start" :key="comment._id" >
                    <div class="card text-white mb-2 comment bg-success">
                        <p class="card-text p-2" v-bind:class="{'retro__start': retro.show}">{{comment.text}}</p>
                    </div>
                </div>
            </transition-group>

        </div>
        <div class="col mr-3 ml-3">
            <span class="retro__stop">Stop</span>

            <div class="row">
                <div class="card border-danger mb-3 input-group">
                    <textarea type="text" class="rounded stop" v-on:keyup.enter="sendComment(2, commentStop)" v-model="commentStop"></textarea>
                </div>
            </div>

            <transition-group name="slide">
                <div class="row" v-for="comment in comment_stop" :key="comment._id">
                    <div class="card text-white mb-2 comment bg-danger">
                        <p class="card-text p-2" v-bind:class="{'retro__stop': retro.show}">{{comment.text}}</p>
                    </div>
                </div>
            </transition-group>
        </div>
        <div class="col ml-3">
            <span class="retro__continue">Continue</span>
            <div class="row">
                <div class="card border-warning mb-3 input-group">
                    <textarea type="text" class="rounded continue" v-on:keyup.enter="sendComment(3, commentContinue)" v-model="commentContinue"></textarea>
                </div>
            </div>

            <transition-group name="slide">
                <div class="row" v-for="comment in comment_continue" :key="comment._id">
                    <div class="card text-white mb-2 comment bg-warning">
                        <p class="card-text p-2" v-bind:class="{'retro__continue': retro.show}">{{comment.text}}</p>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from '@vue/composition-api';
import { useState, useActions, useRouter, useGetters } from '@u3u/vue-hooks';

import ListParticipants from '../components/ListParticipants';
import ControlPanel from '../components/ControlPanel';

export default {

    components: {
        ListParticipants,
        ControlPanel
    },

    setup() {
        const { router, route } = useRouter();

        const { retro_id } = route.value.query;
        console.log("params", retro_id);

        const commentStart = ref('');
        const commentStop = ref('');
        const commentContinue = ref('');

        const { user } = useState('auth', [
            'user'
        ]);

        const { retro } = useGetters('comments', [
            'retro'
        ]);

        const { comment_start, comment_stop, comment_continue, show } = useState('comments', [
            'comment_start', 
            'comment_stop', 
            'comment_continue',
            'show'
        ]);

        const { create, listen, setRetro, listenerRetroUpdate } = useActions('comments', [
            'create',
            'listen',
            'setRetro',
            'listenerRetroUpdate'
        ]);

        setRetro(retro_id).then(() => listen());
        listenerRetroUpdate();

        const sendComment = (action, comment) => {
            create({
                text: comment,
                retro_id: retro_id,
                action: action,
                user_id: user._id
            });
            commentStart.value = '';
            commentStop.value = '';
            commentContinue.value = '';
        };

        watch(user, () => {
            if(!user.value) {
                router.push('/');
            }
        })

        watch(show, () => {

            console.log("aoooooba");
        })

        return { 
            sendComment,
            commentStart,
            commentStop,
            commentContinue,
            user,
            comment_start,
            comment_stop,
            comment_continue,
            show,
            retro
        };
    }

}
</script>

<style lang="scss" scoped>
@import '../styles/abstracts/_variables.scss';
.retro {
  width: 100%;
  height: 100%;
  background: $azul_camarada;
  color: $primary;
  display: flex;
  align-items: center;
  flex-direction: column;

  padding-top: 10vh;

    &__stop {
        color: $danger;
    }

    &__start {
        color: $success;
    }

    &__continue {
        color: $warning;
    }
}

textarea { 
    background-color: $azul_camarada;
    width: 270px;
    height: 50px;
    border: none;
    outline: none !important;
    box-shadow: none;

    &.continue:focus {
        color: $warning;
    }
    &.start:focus {
        color: $success;
    }
    &.stop:focus {
        color: $danger;
    }
}

.comment {
    width: 270px;
    min-height: 50px;

    opacity: 70%;
}

.slide-enter {
    opacity: 0;
}

.slide-enter-active {
    animation: slide-out 3s ease-out forwards;
    transition: opacity 1.5s;
}

.slide-leave {

}

.slide-leave-active {
    animation: slide-out 3s ease-out forwards;
    transition: opacity 3s;
    opacity: 0;
    position: absolute;
}

.slide-move {
    transition: transform 3s;
}

@keyframes slide-in {
    from {
        transform: translateY(100px);
    }
    to {
        transform: translateY(10px);
    }
}

@keyframes slide-out {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(100);
    }
}

</style>