<template>
    <div><button @click="show">点我</button></div>
</template>

<script>
    import '../../../dist/magicUI.js'
    export default{
        mounted(){

        },
        methods:{
            show(){
                var toast=new Toast({"position":"middle","text":"我是toast","delay":2})
                toast.show()
            }
        }
    }
</script>

<style lang="scss">
</style>
