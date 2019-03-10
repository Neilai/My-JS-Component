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
            let countdown2= new Countdown(".countdown2",{'format': 'hh:mm:ss', 'interval': 1000, 'startTime': "12:00:00", 'endTime':"11:55:55"})
        }
    }
</script>

<style lang="scss">
</style>
