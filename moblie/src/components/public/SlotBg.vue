<style lang="scss" scoped>
    .slot-box {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
        background-size: 100% 100%;
    }
</style>

<template>
    <div class="slot-box" :style="{
            'z-index': zIndex ? zIndex : 1, 
            position: position ? position : 'fixed',
            'background-image' : keyboard ? 'none' : `url(${imgsrc})`
        }">
        <slot></slot>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'SlotBg',
        props: ['mask', 'imgsrc', 'zIndex', 'position'],
        computed: {
            ...mapState(['keyboard'])
        }
    }
</script>
