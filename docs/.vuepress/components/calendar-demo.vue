<template>
    <div>
        <div class="calendar" style="width:444px" ></div>
    </div>
</template>

<script>
    import '../../../dist/magicUI.js'
    export default{
        mounted(){
            let calendar=new Calendar(".calendar")
        }
    }
</script>

<style lang="scss">
</style>
