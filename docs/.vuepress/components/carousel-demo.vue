<template>
    <div class="carousel" style="widows:700px;">
    <img src="../../../1.jpg" class="carousel-slide">
    <img src="../../../2.jpg" class="carousel-slide">
    <img src="../../../3.jpg" class="carousel-slide">
    </div>
</template>

<script>
    import '../../../dist/magicUI.js'
    export default{
        mounted(){
            let x=new Carousel(".carousel")
        }
    }
</script>

<style lang="scss">
</style>
