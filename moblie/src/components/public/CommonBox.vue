<style lang="scss" scoped>
    .box {
        position: absolute;
        display: flex;
        flex-direction: column;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
    }

    h1.top {
        background: #627385;
        color: #fff;
        text-align: center;
        height: 1rem;
        line-height: 1rem;
        font-size: .4rem;
        font-weight: 500;
        &.app {
            padding-top: .66rem;
        }
    }
</style>
<template>
    <div class="box">
        <h1 v-if="title" class="top" :class="{app: app}">{{title}}</h1>
        <slot></slot>
        <my-bottom></my-bottom>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import myBottom from './NewBottom.vue'
    export default {
        name: 'CommonBox',
        props: ['title'],
        components: { myBottom },
        computed: {
            ...mapState(['app'])
        }
    }
</script>

