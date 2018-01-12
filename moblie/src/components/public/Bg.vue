<style scoped lang="scss">
    .box {
        position: absolute;
        bottom: 0;
        right: 0;
        top: 0;
        left: 0;
        background-color: #fff;
        background-size: 100% 100%;
    }
    
</style>

<template>
    <div class="box" :style="{
            'z-index': zIndex ? zIndex : '-1',
            'background-image': `url(${imgsrc})`
        }">
    </div>
</template>

<script>
    export default {
        name: 'Bg',
        props: ['imgsrc', 'mask', 'zIndex']
    }
</script>