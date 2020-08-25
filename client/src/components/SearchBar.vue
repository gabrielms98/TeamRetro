<template>
  <div class="d-flex align-items-center p-3 my-3 text-white-50 rounded box-shadow list-header">
        <img class="mr-3" src="../assets/sydle-logo-removebg-preview.png" alt="" width="58" height="58">
        <div class="lh-100 w-100">
            <div class="container text-center">
                <div class="d-flex flex-row-reverse">
                    <div class="searchbar">
                        <input type="text" class="search_input" v-model="serchInput">
                        <button class="btn search_icon" @click="getRetrosMatch(serchInput)">
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useState, useActions, useRouter, useGetters } from '@u3u/vue-hooks';
import { ref, watch } from '@vue/composition-api';

export default {

    setup() {

        let serchInput = ref('');

        const { getRetrosMatch } = useActions('retros', [
            'getRetrosMatch'
        ]);

        const { getPage } = useGetters('retros', [
            getPage
        ]);

        return { 
            getRetrosMatch,
            serchInput
        };

    }

}
</script>

<style lang="scss" scoped>
@import '../styles/abstracts/_variables.scss';

.list-header {
    background: #e74c3c !important;
}

.searchbar {
    width: 300px;
    background-color: #353b48;
    border-radius: 30px;
    padding: 10px;
}

.search_input{
    color: white;
    border: 0;
    outline: 0;
    background: none;
    //caret-color:transparent;
    line-height: 40px;
    transition: width 0.4s linear;
    width: 75%;
}

.search_icon{
    height: 40px;
    width: 40px;
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    text-decoration:none;
    background: white;
    color: #e74c3c;
}

button {
    outline: none;
}
</style>