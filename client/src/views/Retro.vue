<template>
  <div class="retro">
    <div class="row">
        <div class="col mr-3">
            <span class="retro__start">Start</span>

            <div class="row">
                <div class="card border-success mb-3 input-group">
                    <textarea  type="text" class="rounded start" v-on:keyup.enter="sendComment(1, commentStart)" v-model="commentStart"></textarea>
                </div>
            </div>

            <div class="row" v-for="comment in comment_start" :key="comment._id">
                <div class="card text-white mb-2 comment bg-success">
                    <p class="card-text p-2">{{comment.text}}</p>
                </div>
            </div>

        </div>
        <div class="col mr-3 ml-3">
            <span class="retro__stop">Stop</span>

            <div class="row">
                <div class="card border-danger mb-3 input-group">
                    <textarea type="text" class="rounded stop" v-on:keyup.enter="sendComment(2, commentStop)" v-model="commentStop"></textarea>
                </div>
            </div>

            <div class="row" v-for="comment in comment_stop" :key="comment._id">
                <div class="card text-white mb-2 comment bg-danger">
                    <p class="card-text p-2">{{comment.text}}</p>
                </div>
            </div>
        </div>
        <div class="col ml-3">
            <span class="retro__continue">Continue</span>
            <div class="row">
                <div class="card border-warning mb-3 input-group">
                    <textarea type="text" class="rounded continue" v-on:keyup.enter="sendComment(3, commentContinue)" v-model="commentContinue"></textarea>
                </div>
            </div>

            <div class="row" v-for="comment in comment_continue" :key="comment._id">
                <div class="card text-white mb-2 comment bg-warning">
                    <p class="card-text p-2">{{comment.text}}</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from '@vue/composition-api';
import { useState, useActions, useRouter } from '@u3u/vue-hooks';

export default {

    setup() {
        const { router, route } = useRouter();

        const { retro_id } = route.value.query;

        const commentStart = ref('');
        const commentStop = ref('');
        const commentContinue = ref('');

        const { user } = useState('auth', [
            'user'
        ]);

        const { comment_start, comment_stop, comment_continue } = useState('comments', [
            'comment_start', 
            'comment_stop', 
            'comment_continue'
        ]);

        const { create, listen, setRetro } = useActions('comments', [
            'create',
            'listen',
            'setRetro'
        ]);

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

        setRetro(retro_id).then(() => listen());


        return { 
            sendComment,
            commentStart,
            commentStop,
            commentContinue,
            user,
            comment_start,
            comment_stop,
            comment_continue,
        };
    }

}
</script>

<style lang="scss" scoped>
@import '../styles/abstracts/_variables.scss';
.retro {
  width: 100%;
  height: 100%;
  background: $bg_dark;
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
    background-color: $bg_dark;
    width: 250px;
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
    width: 250px;
    min-height: 50px;

    opacity: 70%;
}

</style>