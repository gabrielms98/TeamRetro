<template>
    <div class="retro">

        <div class="row mt-2 container d-flex justify-content-center align-items-center mb-3">
            <div class="col-3 text-center">
                <ListParticipants />
            </div>
            <div class="col-3 text-center">
                <div style="font-size: 60px;" class="p-0">{{displayTimer}}</div>
                <div class="m-0">
                    <button class="btn" @click="startTimer(); play = !play">
                        <svg v-if="play" viewBox="0 0 24 24" width="24" height="24" stroke="#615E61" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        <svg v-else viewBox="0 0 24 24" width="24" height="24" stroke="#615E61" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                    </button>
                </div>
            </div>
            <div class="col-3 text-center">
                <h3>ola</h3>
            </div>
        </div>

        <div class="row justify-content-between">
            <div class="col mr-2">
                
                <div class="row mb-3 input-group">
                    <textarea cols="35" rows="3" class="start rounded" @keyup.enter="sendComment(1, commentStart)" v-model="commentStart"></textarea>
                </div>

                <!-- <transition-group name="slide"> -->
                    <div class="row" v-for="comment in comment_start" :key="comment._id">
                        <div class="card rounded comment comment__start p-2 text-white shadow mb-2">
                            <p class="card-text text-white">
                                {{comment.text}}
                            </p>
                        </div>
                    </div>
                <!-- </transition-group> -->
            </div>

            <div class="col mr-2">
                <div class="row mb-3 input-group">
                    <textarea cols="35" rows="3" class="continue rounded" @keyup.enter="sendComment(2, commentContinue)" v-model="commentContinue"></textarea>
                </div>
                <!-- <transition-group name="slide"> -->
                    <div class="row" v-for="comment in comment_continue" :key="comment._id">
                        <div class="card rounded comment comment__continue p-2 text-white shadow mb-2">
                            <p class="card-text text-white">
                                {{comment.text}}
                            </p>
                        </div>
                    </div>
                <!-- </transition-group> -->
            </div>
            <div class="col mr-2">
                <div class="row mb-3 input-group">
                    <textarea cols="35" rows="3" class="stop rounded" @keyup.enter="sendComment(3, commentStop)" v-model="commentStop"></textarea>
                </div>
                <!-- <transition-group name="slide"> -->
                    <div class="row" v-for="comment in comment_stop" :key="comment._id">
                        <div class="card rounded comment comment__stop p-2 text-white shadow mb-2">
                            <p class="card-text text-white">
                                {{comment.text}}
                            </p>
                        </div>
                    </div>
                <!-- </transition-group> -->
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

        let timer = 10 * 60;
        let displayTimer = ref('');
        let play = ref('');
        let interval;

        displayTimer.value = "10:00";
        play.value = true;

        const { router, route } = useRouter();

        const { retro_id } = route.value.query;

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

            const STRING_LENGTH = 300;
            if(comment.length > STRING_LENGTH) return;

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

        function pauseTimer() {
            play.value = false;
            timer = 0;
            clearInterval(interval);
            //updateTimerStatus(false);
        }

        function startTimer() {
            console.log("OLAAA");
            play.value = true;
            if (timer > 0) {
                //updateTimerStatus(true);
                interval = setInterval(() => {
                    timer--;
                    if (timer <= 0) {
                        pauseTimer();
                    }
                    displayTimer.value = fillTimer();
                }, 1000);
            }
        }

        function getSpace(numberSpace) {
            let space = '';
            for (let i = 0; i < numberSpace; i++) { space += ' '; }
            return space;
        }

        function fillTimer() {
            if (timer === 0) {
                return 'Time is up!';
            }

            const minutes = Math.floor(timer / 60).toString();
            let seconds = (timer % 60).toString();
            seconds = seconds.length === 2 ? seconds : '0' + seconds;

            return getSpace(5) + minutes + ':' + seconds + getSpace(5);

        }

        watch(user, () => {
            if(!user.value) {
                router.push('/');
            }
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
            retro,
            displayTimer,
            play,
            startTimer
        };
    }

}
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';
.retro {
  width: 100%;
  min-height: 100%;
  background: $bg_dark;
  background-image: url('../assets/Desktop - 3Retro.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100vw;
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
    outline: none;
    border: none;
    padding: 5px;
    &.start {
        background: rgba(29, 167, 77, 0.70);
        border: 1px solid $success;
    }
    &.continue {
        background: rgba(255, 192, 45, 0.70);
        border: 1px solid $warning;
    }
    &.stop {
        background: rgba(223, 53, 68, 0.70);
        border: 1px solid $danger;
    }
}

.comment {
    width: 310px;
    min-height: 50px;

    outline: none;
    border: none;

    &__start {
        background: $success;
    }
    &__continue {
        background: $warning;
    }
    &__stop {
        background: $danger;
    }


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