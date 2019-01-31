<template>
    <div>
        <div class="countdown1">
        </div>
        <div class="countdown2">
        </div>
    </div>

</template>

<script>
    import '../../../dist/magicUI.js'
    export default{
        mounted(){
            let countdown1 = new Countdown(".countdown1")
//            let countdown2= new Countdown(".countdown2",{'startTime': 10, 'endTime': 0})
        }
    }
</script>

<style lang="scss">
</style>
