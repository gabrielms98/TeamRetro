<template>
  <div class="control-panel">
    <button class="btn btn-primary mr-2" @click="show = !show">
        <span>
            <svg v-if="show" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        <svg v-else viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
        </span>
    </button>
    <button class="btn btn-primary mr-2" @click="startTimer()">{{displayTimer}}</button>
    <button class="btn btn-primary">oi</button>
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
        let interval;

        displayTimer.value = "10:00";
        timer.value = 10 * 60;

        const { showComments } = useActions('comments', [
            'showComments'
        ]);

        watch(show, () => {
            showComments(show.value); 
        });

        function pauseTimer() {
            timer.value = 0;
            clearInterval(interval);
        }

        function startTimer() {
            if (timer.value > 0) {
            interval = setInterval(() => {
                timer.value--;
                if (timer.value <= 0) {
                    pauseTimer();
                }
                displayTimer.value = fillTimer();
            }, 1000);
            }
        }

        function fillTimer() {
            if (timer === 0) {
                return 'Time is up!';
            }

            const minutes = Math.floor(timer.value / 60).toString();
            let seconds = (timer.value % 60).toString();
            seconds = seconds.length === 2 ? seconds : '0' + seconds;

            return minutes + ':' + seconds;

        }

        function getSpace(numberSpace) {
            let space = '';
            for (let i = 0; i < numberSpace; i++) { space += ' '; }
            return space;
        }

        return {
            show,
            timer,
            fillTimer,
            startTimer,
            displayTimer
        };
    }

}
</script>

<style lang="scss" scoped>
@import '../styles/abstracts/_variables.scss';

.control-panel {
    display: flex;
    flex-direction: row;
}

</style>