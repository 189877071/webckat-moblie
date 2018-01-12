<style scoped lang="scss">
    header.top {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 2;
    }
    .top h1 {
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
    <header class="top">
        <h1 :class="{app: app}"><slot></slot></h1>
    </header>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        name: 'Top',
        computed: {
            ...mapState(['app'])
        }
    }
</script>
