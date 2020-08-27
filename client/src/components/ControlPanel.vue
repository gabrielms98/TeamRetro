<template>
    <div class="control-panel justify-content-center">

        <div class="btn-group " role="group" aria-label="Basic example">
            <button type="button" @click="show = !show" class="btn btn-outline-orange btn-rounded waves-effect">
                <svg v-if="show" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <svg v-else viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                 {{show ? "Show" : "Hide"}}
            </button>
            <button type="button" class="btn btn-outline-orange btn-rounded waves-effect" @click="startTimer()">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                {{displayTimer}}
            </button>
            <button @click="play = !play" class="btn btn-outline-orange btn-rounded waves-effect">
                <svg v-if="play" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <svg v-else viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                {{play ? "Play" : "Pause"}}
            </button>
        </div>
    </div>
</template>

<script>
import { ref, watch } from '@vue/composition-api';
import { useState, useActions, useRouter } from '@u3u/vue-hooks';

export default {

    setup() {
        let show = ref('');
        let timer = ref('');
        let displayTimer = ref('');
        let play = ref('');
        let interval;

        displayTimer.value = "10:00";
        timer.value = 10 * 60;

        const { showComments, updateTimerStatus } = useActions('comments', [
            'showComments',
            'updateTimerStatus'
        ]);

        watch(show, () => {
            showComments(show.value); 
        });

        function pauseTimer() {
            timer.value = 0;
            clearInterval(interval);
            updateTimerStatus(false);
        }

        function startTimer() {
            if (timer.value > 0) {
                updateTimerStatus(true);
                interval = setInterval(() => {
                    timer.value--;
                    if (timer.value <= 0) {
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

            const minutes = Math.floor(timer.value / 60).toString();
            let seconds = (timer.value % 60).toString();
            seconds = seconds.length === 2 ? seconds : '0' + seconds;

            return getSpace(5) + minutes + ':' + seconds + getSpace(5);

        }

        return {
            show,
            timer,
            fillTimer,
            startTimer,
            displayTimer,
            play
        };
    }

}
</script>

<style lang="scss" scoped>
@import '../styles/abstracts/_variables.scss';

.control-panel {
    display: flex;
    flex-direction: row;
    font-size: 3.2vw;
}

.btn-outline-orange {
    border-color: $orange;
    border: 2px solid $orange;
}

.btn{
    color: $orange !important;
    font-weight: bold;
}

</style>